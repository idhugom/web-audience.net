#!/usr/bin/env node
// Image pipeline: download existing WordPress covers, generate missing ones
// with gpt-image-2 (ultra-realistic). Outputs optimized WebP + data/images.json.
//
// Usage: node scripts/images.mjs --limit 25 | --slugs a,b | --batch f.json | --all
//        flags: --concurrency 5 --force --regen-only
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { generateImage } from './lib/openai.mjs';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const COVERS_DIR = path.join(ROOT, 'public/images/covers');
const POSTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/posts.json'), 'utf8'));
const MAP_PATH = path.join(ROOT, 'data/images.json');
fs.mkdirSync(COVERS_DIR, { recursive: true });

const args = process.argv.slice(2);
const getFlag = (n) => args.includes(n);
const getOpt = (n, d) => { const i = args.indexOf(n); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const CONCURRENCY = Number(getOpt('--concurrency', '5'));
const FORCE = getFlag('--force');
const REGEN_ONLY = getFlag('--regen-only'); // only (re)generate missing-image posts

const imagesMap = fs.existsSync(MAP_PATH) ? JSON.parse(fs.readFileSync(MAP_PATH, 'utf8')) : {};

function selectPosts() {
  let pool = POSTS.slice();
  if (getOpt('--slugs')) {
    const set = new Set(getOpt('--slugs').split(',').map((s) => s.trim()));
    pool = pool.filter((p) => set.has(p.slug));
  } else if (getOpt('--batch')) {
    const set = new Set(JSON.parse(fs.readFileSync(getOpt('--batch'), 'utf8')));
    pool = pool.filter((p) => set.has(p.slug));
  }
  if (REGEN_ONLY) pool = pool.filter((p) => !p.featured_image);
  if (!FORCE) pool = pool.filter((p) => !fs.existsSync(path.join(COVERS_DIR, `${p.slug}.webp`)));
  if (getFlag('--all') || getOpt('--slugs') || getOpt('--batch')) return pool;
  return pool.slice(0, Number(getOpt('--limit', '25')));
}

async function toWebp(buf, slug) {
  const out = path.join(COVERS_DIR, `${slug}.webp`);
  await sharp(buf)
    .rotate()
    .resize(1200, 675, { fit: 'cover', position: 'attention' })
    .webp({ quality: 82, effort: 5 })
    .toFile(out);
  return `/images/covers/${slug}.webp`;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tryDownload(url) {
  // Existing files serve a 200 image; missing/deleted files 301 to the homepage.
  // Returns a valid image Buffer, or null when the source has no real image.
  let redirects = 0;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, {
        redirect: 'manual',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
          Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
          Referer: 'https://wtrns.fr/',
        },
      });
      const ct = res.headers.get('content-type') || '';
      if (res.status >= 300 && res.status < 400) {
        // Redirect usually means the file was deleted; retry once in case a
        // transient/load-induced redirect masks an existing file.
        if (++redirects >= 2) return null;
        await sleep(800);
        continue;
      }
      if (!res.ok || !ct.startsWith('image/')) {
        await sleep(600 * (attempt + 1));
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      const meta = await sharp(buf).metadata();
      if (!meta.width || meta.width < 200) return null;
      return buf;
    } catch {
      await sleep(600 * (attempt + 1));
    }
  }
  return null;
}

function imagePrompt(post) {
  const title = post.title.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/gi, ' ').trim();
  return `Photographie éditoriale ultra réaliste illustrant le sujet : « ${title} ».
Style : photo professionnelle haute résolution, rendu naturel et crédible, éclairage doux et réaliste, faible profondeur de champ, composition soignée de type magazine. Couleurs naturelles, ambiance lumineuse et moderne. Aucune personne reconnaissable en gros plan, aucun texte, aucun logo, aucun filigrane, aucune interface. Cadrage horizontal.`;
}

async function pool(items, size, worker) {
  const results = []; let idx = 0;
  const runners = Array.from({ length: Math.min(size, items.length) }, async () => {
    while (idx < items.length) { const i = idx++; results[i] = await worker(items[i], i).catch((e) => ({ error: e.message })); }
  });
  await Promise.all(runners);
  return results;
}

const targets = selectPosts();
let dl = 0, gen = 0, fail = 0;
const failures = [];
console.log(`\n▶ Images : ${targets.length} à traiter (concurrence ${CONCURRENCY})\n`);

await pool(targets, CONCURRENCY, async (post, i) => {
  const tag = `[${String(i + 1).padStart(3)}/${targets.length}] ${post.slug}`;
  try {
    let file, source;
    // 1) Try to reuse the existing featured image (skipped if --regen mode or none).
    let buf = null;
    if (post.featured_image && !getFlag('--force-generate')) {
      buf = await tryDownload(post.featured_image);
    }
    if (buf) {
      file = await toWebp(buf, post.slug);
      source = 'existing';
      dl++;
      console.log(`⬇️  ${tag} (existante réutilisée)`);
    } else {
      // 2) Fallback: generate an ultra-realistic cover with gpt-image-2.
      const img = await generateImage({ prompt: imagePrompt(post), size: '1536x1024', quality: 'medium' });
      file = await toWebp(img, post.slug);
      source = 'generated';
      gen++;
      console.log(`🎨 ${tag} (générée gpt-image-2${post.featured_image ? ' — source protégée' : ''})`);
    }
    imagesMap[post.slug] = { file, source };
  } catch (e) {
    fail++;
    failures.push({ slug: post.slug, error: e.message });
    console.log(`❌ ${tag} · ${e.message}`);
  }
});

fs.writeFileSync(MAP_PATH, JSON.stringify(imagesMap, null, 1));
console.log(`\n─── Images OK · téléchargées=${dl} · générées=${gen} · échecs=${fail}`);
if (failures.length) fs.writeFileSync(path.join(ROOT, 'data/img-failures.json'), JSON.stringify(failures, null, 2));
