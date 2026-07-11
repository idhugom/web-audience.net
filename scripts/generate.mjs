#!/usr/bin/env node
// Content generation pipeline — regenerates article bodies with gpt-5.6-terra.
//
// Usage:
//   node scripts/generate.mjs --limit 25            # first N not-yet-generated
//   node scripts/generate.mjs --slugs a,b,c         # specific slugs
//   node scripts/generate.mjs --batch data/x.json   # slugs from a JSON array
//   node scripts/generate.mjs --all                 # everything remaining
//   flags: --concurrency 6  --force  --dry
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SYSTEM_PROMPT, buildUserPrompt, RESPONSE_SCHEMA } from './lib/prompt.mjs';
import { generateStructured } from './lib/openai.mjs';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const BLOG_DIR = path.join(ROOT, 'src/content/blog');
const COVERS_DIR = path.join(ROOT, 'public/images/covers');
const POSTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/posts.json'), 'utf8'));
const IMAGES = fs.existsSync(path.join(ROOT, 'data/images.json'))
  ? JSON.parse(fs.readFileSync(path.join(ROOT, 'data/images.json'), 'utf8'))
  : {};

fs.mkdirSync(BLOG_DIR, { recursive: true });

// ---------- args ----------
const args = process.argv.slice(2);
const getFlag = (n) => args.includes(n);
const getOpt = (n, d) => {
  const i = args.indexOf(n);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};
const CONCURRENCY = Number(getOpt('--concurrency', '6'));
const FORCE = getFlag('--force');
const DRY = getFlag('--dry');

function selectPosts() {
  if (getOpt('--slugs')) {
    const set = new Set(getOpt('--slugs').split(',').map((s) => s.trim()));
    return POSTS.filter((p) => set.has(p.slug));
  }
  if (getOpt('--batch')) {
    const list = JSON.parse(fs.readFileSync(getOpt('--batch'), 'utf8'));
    const set = new Set(list);
    return POSTS.filter((p) => set.has(p.slug));
  }
  let pool = POSTS.slice();
  if (!FORCE) pool = pool.filter((p) => !fs.existsSync(path.join(BLOG_DIR, `${p.slug}.md`)));
  if (getFlag('--all')) return pool;
  const limit = Number(getOpt('--limit', '25'));
  return pool.slice(0, limit);
}

// ---------- helpers ----------
const y = (v) => JSON.stringify(v); // JSON is valid YAML for scalars/flow

function readingTime(md) {
  const words = md.replace(/[#>*`|:-]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function coverFor(slug) {
  const rec = IMAGES[slug];
  if (rec && rec.file) return rec.file; // e.g. /images/covers/slug.webp
  if (fs.existsSync(path.join(COVERS_DIR, `${slug}.webp`))) return `/images/covers/${slug}.webp`;
  return null;
}

function frontmatter(obj) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    lines.push(`${k}: ${y(v)}`);
  }
  lines.push('---', '');
  return lines.join('\n');
}

function toMarkdown(post, r) {
  const cover = coverFor(post.slug);
  const fm = {
    title: post.title.replace(/&#8217;|&rsquo;/g, '’').replace(/&amp;/g, '&').replace(/&hellip;/g, '…').replace(/&laquo;|&raquo;/g, '"').replace(/<[^>]+>/g, ''),
    description: r.meta_description,
    pubDate: post.date,
    updatedDate: new Date().toISOString().slice(0, 10),
    category: null, // filled by categories map at render (categorySlug used)
    categorySlug: r.category_slug,
    cover: cover || undefined,
    coverAlt: cover ? r.cover_alt : undefined,
    takeaways: r.takeaways,
    faq: r.faq,
    readingTime: readingTime(r.body_markdown),
    sourceId: post.id,
  };
  // Resolve display category name
  fm.category = CATEGORY_NAME[r.category_slug] || 'Général';
  return frontmatter(fm) + r.body_markdown.trim() + '\n';
}

const CATEGORY_NAME = {
  'tech-web-numerique': 'Tech, Web & Numérique',
  'finance-assurance': 'Argent, Finance & Assurance',
  'maison-jardin': 'Maison, Jardin & Bricolage',
  'cuisine-gastronomie': 'Cuisine & Gastronomie',
  'sante-bien-etre': 'Santé & Bien-être',
  'voyage-evasion': 'Voyage & Évasion',
  'auto-mobilite': 'Auto, Moto & Mobilité',
  'sport-plein-air': 'Sport & Plein air',
  'famille-education': 'Famille, Enfants & Éducation',
  'mode-style': 'Mode, Style & Shopping',
  'nature-environnement': 'Nature & Environnement',
  'developpement-personnel': 'Développement personnel & Productivité',
};

// ---------- pool ----------
async function pool(items, size, worker) {
  const results = [];
  let idx = 0;
  const runners = Array.from({ length: Math.min(size, items.length) }, async () => {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await worker(items[i], i).catch((e) => ({ error: e.message }));
    }
  });
  await Promise.all(runners);
  return results;
}

// ---------- main ----------
const targets = selectPosts();
const totalUsage = { input: 0, output: 0, reasoning: 0 };
let ok = 0, fail = 0;
const failures = [];
const startedAt = Date.now();

console.log(`\n▶ Génération de ${targets.length} article(s) — modèle gpt-5.6-terra (high/high), concurrence ${CONCURRENCY}${DRY ? ' [DRY]' : ''}\n`);

await pool(targets, CONCURRENCY, async (post, i) => {
  const tag = `[${String(i + 1).padStart(3)}/${targets.length}] ${post.slug}`;
  if (DRY) { console.log(`${tag} (dry)`); return; }
  const t0 = Date.now();
  try {
    const { parsed, usage } = await generateStructured({
      system: SYSTEM_PROMPT,
      user: buildUserPrompt(post),
      schema: RESPONSE_SCHEMA,
    });
    const md = toMarkdown(post, parsed);
    fs.writeFileSync(path.join(BLOG_DIR, `${post.slug}.md`), md, 'utf8');
    if (usage) {
      totalUsage.input += usage.input_tokens || 0;
      totalUsage.output += usage.output_tokens || 0;
      totalUsage.reasoning += usage.output_tokens_details?.reasoning_tokens || 0;
    }
    ok++;
    const secs = ((Date.now() - t0) / 1000).toFixed(0);
    console.log(`✅ ${tag} · ${parsed.category_slug} · ${readingTime(parsed.body_markdown)}min · ${secs}s`);
  } catch (e) {
    fail++;
    failures.push({ slug: post.slug, error: e.message });
    console.log(`❌ ${tag} · ${e.message}`);
  }
});

const mins = ((Date.now() - startedAt) / 60000).toFixed(1);
console.log(`\n─── Terminé en ${mins} min · OK=${ok} · Échecs=${fail}`);
console.log(`Tokens — input ${totalUsage.input.toLocaleString()} · output ${totalUsage.output.toLocaleString()} (dont raisonnement ${totalUsage.reasoning.toLocaleString()})`);
if (failures.length) {
  fs.writeFileSync(path.join(ROOT, 'data/gen-failures.json'), JSON.stringify(failures, null, 2));
  console.log(`Échecs enregistrés dans data/gen-failures.json`);
}
