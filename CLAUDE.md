# CLAUDE.md — Règles de travail & guide de rédaction

Ce fichier oriente **toute** intervention de Claude sur ce dépôt. Il **complète**
l'existant : il ne demande **aucune** refonte du site actuel. On applique ces
règles aux **nouvelles** interventions (nouveaux articles, corrections,
améliorations ponctuelles).

---

## 0. Le projet en 30 secondes

**web-audience.net** — média francophone qui **décrypte le web, le numérique et
la vie connectée**, mais au sens large : la vie connectée touche à tout (tech,
argent, maison, santé, voyage, cuisine, sport…). Chaque article part d'une
**vraie question** et y répond de A à Z, sans jargon.

- **Stack** : [Astro](https://astro.build) 5, **sortie statique** (`dist/`), design
  system bleu maison, **light mode only**. Recherche via
  [Pagefind](https://pagefind.app) (index statique). Node **22** (`.nvmrc`).
- **Déploiement** : **Cloudflare Pages**, branche de production **`main`**,
  build `npm run build`, sortie `dist/`. Pousser sur `main` = publier.
- **URL des articles** : `https://www.web-audience.net/{slug}.html/`
  (le `.html` fait partie du chemin ; `trailingSlash: 'always'`).
- **Contenu** : ~680 articles dans `src/content/blog/*.md` (Markdown + frontmatter).

> Historique : les corps d'articles étaient générés via l'API OpenAI
> (`scripts/generate.mjs`, modèle `gpt-5.6-terra`). **Ce n'est plus le mode par
> défaut** — voir la Règle d'or n°1 ci-dessous. Les scripts restent dans le dépôt
> à titre de référence/legacy ; ne pas les supprimer, mais ne plus s'en servir
> pour rédiger.

---

## 1. Règles d'intervention Claude (impératives)

### Règle n°1 — TOUJOURS travailler sur `main`
Toute session — développement, rédaction, amélioration, correction, etc. — se
fait **directement sur la branche `main`** de GitHub. **Ne JAMAIS créer de
branche** ni travailler sur une branche secondaire. `main` est la branche de
production Cloudflare Pages : y committer et pousser publie le site.

### Règle n°2 — Toujours en qualité optimale
Se mettre **systématiquement en qualité maximale du modèle** (le réglage le plus
intelligent / le plus performant : meilleur modèle disponible, effort de
raisonnement maximal) pour **chaque** intervention.
**Seule exception** : la génération de **photo via l'API OpenAI**, qui reste en
`quality: "medium"` (voir §7).

### Règle n°3 — Clés API / tokens
Toutes les clés et tokens nécessaires (`OPENAI_API_KEY` pour la génération
d'images, ainsi que `OPENAI_TEXT_MODEL`, `OPENAI_IMAGE_MODEL`, clés Cloudflare,
etc.) sont **fournis par l'environnement cloud de Claude Code** via les
**variables d'environnement** (`process.env`).
- **Récupère-les depuis l'environnement**, ne les redemande jamais.
- **Ne les écris JAMAIS en dur** dans le code, ni dans un commit, ni dans un
  fichier versionné. Les fichiers `.env`, `.env.local`, `.dev.vars` sont déjà
  git-ignorés — ne jamais committer de secret.

---

## 2. Règles de rédaction

> Ces règles s'appliquent quand on **crée ou améliore un article**.

### §0 — Règles d'or (prioritaires)

1. **Rédaction par Claude, pas par l'API.** Le contenu de l'article est écrit
   par **toi, Claude** (le modèle le plus intelligent), **directement en
   session** — plus par le pipeline API. Désormais **c'est Claude qui rédige**.
   **Seules les images passent par OpenAI** (§7).
2. **Anti-cannibalisation.** Si le sujet est libre, **vérifie d'abord ce qui est
   déjà publié** (§4). Chaque nouvel article doit porter sur un **sujet
   différent** de l'existant, pour éviter la cannibalisation SEO.
3. **Qualité avant tout.** Chaque article doit **vraiment apporter les
   meilleures informations** sur son sujet : des détails en plus et, **selon la
   pertinence**, des éléments riches (tableau, comparaison, astuces, FAQ,
   citation, chiffres…). Ce sont des **exemples** — pas besoin de tout mettre à
   chaque fois (§5).
4. **Photo OpenAI obligatoire.** **Jamais publier un article sans visuel.**
   Toujours une **vraie photo à la une générée par OpenAI**, « photo
   généraliste sur le thème, ultra réaliste », **avant publication** (§7).
5. **Liens internes.** Ajouter **1 à 3 liens internes** (jusqu'à 4) par article
   vers d'autres pages du site (§6).

### §1 — Le site en bref (ligne éditoriale)

web-audience.net est un **média de vulgarisation utile et transversal**. Sa
promesse : *le web expliqué, décrypté, maîtrisé*. On ne « remplit pas la page »,
on **répond à une intention de recherche** de bout en bout.

- **Public** : francophone, grand public curieux ou en recherche de solution
  concrète (« comment faire », « quelle différence entre », « faut-il… »,
  « comment choisir… »).
- **Angle** : partir de la **question réelle** derrière le titre et donner une
  réponse **complète, structurée, actionnable** — le lecteur repart avec de quoi
  décider ou agir.
- **Périmètre** : 12 thématiques fixes (§8). Un même article appartient à **une
  seule** thématique.
- **Ce qu'on n'est pas** : ni blog d'opinion, ni actualité chaude, ni contenu
  putaclic. Pas de promesses irréalistes, pas de superlatifs creux.

### §2 — Identité & ton

- **Voix** : expert **accessible**. Clair, direct, concret, un brin
  chaleureux. On explique le « pourquoi » autant que le « comment ».
- **Écriture** : phrases nettes, paragraphes courts. **Zéro jargon inutile**
  (et quand un terme technique est nécessaire, on le définit).
- **À bannir** : formules creuses (« de nos jours », « à l'ère du numérique »,
  « il est important de noter que »), remplissage, généralités, ton
  promotionnel.
- **Fiabilité (très important)** : **n'invente jamais** de chiffre précis, prix,
  date, pourcentage, nom de loi ou statistique présenté comme un fait certain.
  Si une donnée chiffrée est utile mais incertaine, donne un **ordre de
  grandeur** (« généralement », « souvent autour de », « selon les cas ») et
  invite à vérifier auprès d'une source officielle ou d'un professionnel. Sur
  les sujets sensibles (**santé, argent, droit**), rester prudent et renvoyer
  vers un professionnel qualifié quand c'est pertinent.
- **Langue** : rédige dans la langue du **titre** (français par défaut).
  Orthographe et **typographie françaises impeccables** (guillemets « … »,
  espaces insécables, apostrophes typographiques ’).

### §3 — Avant d'écrire : anti-cannibalisation

Avant tout nouvel article à **sujet libre** :

1. **Liste l'existant.** Parcours `src/content/blog/` (les slugs = les sujets
   déjà publiés) et, si besoin, `data/posts.json` (référentiel des sujets
   sources). Utilise la recherche par mots-clés sur les titres/slugs et sur la
   thématique visée.
2. **Écarte les doublons.** Si un sujet **très proche** existe déjà, **change
   d'angle** (autre intention de recherche, autre question) ou **choisis un autre
   sujet**. On ne publie pas deux articles qui se disputeraient les mêmes
   requêtes.
3. **Complète plutôt que dupliquer.** Si un sujet mérite mieux, préfère
   **améliorer l'article existant** (et lui ajouter des liens internes) plutôt
   que d'en créer un concurrent.
4. **Décale l'angle si nécessaire.** Ex. « assurance auto pas cher » existe déjà
   → viser une **sous-question** distincte (garanties, résiliation, jeune
   conducteur…) et lier les deux articles entre eux.

### §4 — Qualité rédactionnelle

Objectif : **l'article de référence** sur son sujet.

- **Profondeur** : ~**1400 à 2200 mots**, structurés et faciles à parcourir.
  Couvrir le « quoi », le « pourquoi », le « comment », les cas particuliers,
  les erreurs à éviter, les alternatives, et le budget/temps quand c'est utile.
- **Structure du corps** (Markdown propre, **sans titre H1**) :
  - **Introduction** : 2 courts paragraphes **sans titre** — accroche, cadrage
    du sujet, annonce de ce que le lecteur va obtenir.
  - Sections en **`##` (H2)** claires et informatives, sous-parties en **`###`
    (H3)**.
  - **Listes** à puces/numérotées pour étapes, critères, avantages/inconvénients.
  - **Gras** (`**…**`) sur les informations clés.
  - Une **section de synthèse** actionnable pour finir (ex. `## En pratique`
    ou `## Ce qu'il faut retenir`). **Pas de FAQ dans le corps** : elle est
    portée par le frontmatter (§9).
- **Encadrés (callouts)** : **2 à 4 par article**, variés, **seulement quand ils
  apportent de la valeur**. Syntaxe et types disponibles en §9.
- **Tableau** : ajouter **au moins un tableau Markdown GFM** dès que le sujet
  s'y prête (comparaison, récapitulatif, critères, avant/après, options).
  Garder 3 à 6 lignes, lisibles.
- **Éléments riches selon pertinence** (exemples, pas obligation) : comparaison,
  astuces, citation, chiffres encadrés (`:::stat`), mini check-list.
- **Cohérence avec le schéma** : renseigner correctement `takeaways`, `faq`,
  `description`, `coverAlt` (§9).

### §5 — Liens internes (1 à 3 par article, jusqu'à 4)

- Ajouter **1 à 3 liens internes** (idéalement) — **jusqu'à 4** — vers d'autres
  pages/articles du site, **intégrés naturellement** dans le texte.
- **Format d'URL** : lien Markdown vers **`/{slug-cible}.html/`** (chemin
  relatif au site, slash final inclus). Exemple :
  `voir notre [guide de l'audit SEO](/audit-seo-quels-sont-ses-avantages.html/)`.
- **Ancre descriptive** (pas de « cliquez ici ») et **pertinence thématique** :
  privilégier des articles de la **même thématique** ou complémentaires.
- **Vérifier que la cible existe** dans `src/content/blog/` avant de lier
  (le slug = le nom du fichier sans `.md`).
- Ces liens s'**ajoutent** au bloc « À lire aussi » déjà calculé
  automatiquement par thématique dans `src/pages/[slug].astro` — ils ne le
  remplacent pas.

### §6 — Photo : toujours une vraie photo OpenAI avant publication

Voir la procédure complète et les paramètres API en **§7**.

---

## 3. Workflow de publication d'un article (pas à pas)

1. **Sujet** — confirmer un sujet **non cannibalisant** (§3).
2. **Rédaction** — écrire l'article **en session, en qualité max** (Règle n°2),
   en respectant §4 (structure, callouts, tableau, ton, fiabilité) et §5 (liens
   internes).
3. **Image à la une** — générer la photo via **OpenAI `gpt-image-2`**
   (`1536x1024`, `quality: "medium"`), la convertir en **WebP 1200×675** et la
   déposer dans `public/images/covers/{slug}.webp` (§7).
4. **Fichier** — créer `src/content/blog/{slug}.md` avec le **frontmatter
   complet** (§9) + le corps Markdown.
5. **Vérification** (recommandé) — `npm run build` doit passer (le schéma de
   contenu est strict : voir §9).
6. **Publication** — committer et **pousser sur `main`** (Règle n°1). Cloudflare
   Pages reconstruit et publie.

---

## 4. Commandes utiles

```bash
npm install
npm run dev          # serveur local (astro dev)
npm run build        # build prod -> dist/ (+ index Pagefind) ; valide le schéma de contenu
npm run build:fast   # build sans index Pagefind
npm run preview      # prévisualiser dist/
```

Scripts (legacy / images) :

```bash
node scripts/images.mjs --slugs mon-slug     # (ré)utilise ou génère l'image de couverture
# scripts/generate.mjs (gpt-5.6-terra) : legacy — la rédaction se fait désormais en session.
```

---

## 5. Ne PAS faire

- ❌ Créer une branche ou pousser ailleurs que sur `main`.
- ❌ Publier un article **sans image** de couverture.
- ❌ Écrire une clé/token en dur ou committer un `.env`.
- ❌ Inventer des chiffres/prix/dates/lois présentés comme certains.
- ❌ Publier un sujet **quasi identique** à un article existant (cannibalisation).
- ❌ Ajouter un titre `#` (H1) dans le corps, ou mettre la FAQ dans le corps.
- ❌ Refondre le site existant sans demande explicite : on **complète**.

---

## 6. Photo — paramètres API (§7)

**Règle absolue : jamais publier sans visuel.** Toujours une **vraie photo de
couverture générée par OpenAI**, **ultra réaliste**, avant publication.

- **Modèle & paramètres** (via `OPENAI_API_KEY` de l'environnement) :

  ```json
  { "model": "gpt-image-2", "size": "1536x1024", "quality": "medium" }
  ```

- **Une seule image (hero) par article.** Pas de galerie, pas d'image dans le
  corps.
- **Style attendu** : photographie éditoriale **ultra réaliste**, généraliste
  sur le thème, rendu naturel et crédible, éclairage doux, composition soignée
  type magazine. **Aucun texte, logo, filigrane, interface**, aucune personne
  reconnaissable en gros plan. Cadrage **horizontal**.
- **Traitement & emplacement** : convertir en **WebP**, recadrer en **1200×675
  (ratio 16/9)**, enregistrer dans **`public/images/covers/{slug}.webp`**.
  (Le script `scripts/images.mjs` fait déjà génération + conversion WebP ; on
  peut le réutiliser.)
- **Frontmatter** : renseigner `cover: "/images/covers/{slug}.webp"` et un
  `coverAlt` **descriptif et factuel** (≤ 120 caractères, sans « image de »).

---

## 7. Référence technique — frontmatter & schéma

Le schéma de contenu est **strict** (`src/content.config.ts`). Un article =
`src/content/blog/{slug}.md`. Le **slug = le nom du fichier** (et l'URL est
`/{slug}.html/`).

Champs du frontmatter :

| Champ | Type | Requis | Notes |
|---|---|---|---|
| `title` | string | ✅ | Titre de l'article. |
| `description` | string | ✅ | Meta description SEO, **150–160 caractères**, incitative, sans guillemets. |
| `pubDate` | date | ✅ | Date de publication (ISO). |
| `updatedDate` | date | — | Date de mise à jour (`YYYY-MM-DD`). |
| `cover` | string | — (mais **obligatoire à la publi**) | `"/images/covers/{slug}.webp"`. |
| `coverAlt` | string | — | Alt descriptif ≤ 120 car. |
| `category` | string | — | Nom affiché (voir §8). |
| `categorySlug` | string | — | **Un** slug parmi la liste §8. |
| `tags` | string[] | — | Optionnel. |
| `takeaways` | string[] | — | **3 à 5** points « L'essentiel », formulés comme des bénéfices concrets. |
| `faq` | `{question,answer}[]` | — | **4 à 6** Q/R (People Also Ask), réponses autonomes de 2–4 phrases. |
| `readingTime` | number | — | Minutes (~200 mots/min). |
| `sourceId` | number | — | Id source (migration) — laisser tel quel si présent. |
| `draft` | boolean | — | `true` = non publié. |

**Gabarit de frontmatter :**

```yaml
---
title: "Titre exact de l'article"
description: "Meta description incitative de 150 à 160 caractères avec le mot-clé principal."
pubDate: "2026-07-13"
updatedDate: "2026-07-13"
category: "Tech, Web & Numérique"
categorySlug: "tech-web-numerique"
cover: "/images/covers/mon-slug.webp"
coverAlt: "Description factuelle et descriptive du visuel de couverture"
takeaways: ["Bénéfice concret 1", "Bénéfice concret 2", "Bénéfice concret 3"]
faq: [{"question":"…?","answer":"…"}, {"question":"…?","answer":"…"}]
readingTime: 10
---
Premier paragraphe d'introduction (sans titre)…

Second paragraphe d'introduction…

## Première section (H2)
…
```

### Encadrés (callouts) disponibles

Transformés en blocs stylés par `src/plugins/remark-callouts.mjs`. **Laisser
toujours une ligne vide avant `:::nom` et après le `:::` de fermeture.** Titre
personnalisable via `:::info[Mon titre]`.

| Directive | Rôle |
|---|---|
| `:::info` | Contexte, précision (« Bon à savoir »). |
| `:::tip` | Astuce, gain de temps (« Conseil »). |
| `:::warning` | Point de vigilance (« Attention »). |
| `:::danger` | Erreur à éviter (« À éviter »). |
| `:::success` | Bénéfice / validation (« À retenir »). |
| `:::note` | Note. |
| `:::key` | Points clés à mémoriser. |
| `:::stat` | Chiffre clé mis en avant. |

```markdown
:::tip
Astuce concrète et actionnable.
:::
```

Markdown : **GFM activé** (tableaux, etc.), `smartypants` (typographie).
Coloration de code en `github-light`. **Jamais de `#` (H1)** — le H1 est le
titre de la page.

---

## 8. Thématiques (taxonomie fixe)

Un article = **une seule** thématique (`categorySlug` + `category`). Source :
`src/data/categories.ts`.

| `categorySlug` | `category` (nom affiché) |
|---|---|
| `tech-web-numerique` | Tech, Web & Numérique |
| `finance-assurance` | Argent, Finance & Assurance |
| `maison-jardin` | Maison, Jardin & Bricolage |
| `cuisine-gastronomie` | Cuisine & Gastronomie |
| `sante-bien-etre` | Santé & Bien-être |
| `voyage-evasion` | Voyage & Évasion |
| `auto-mobilite` | Auto, Moto & Mobilité |
| `sport-plein-air` | Sport & Plein air |
| `famille-education` | Famille, Enfants & Éducation |
| `mode-style` | Mode, Style & Shopping |
| `nature-environnement` | Nature & Environnement |
| `developpement-personnel` | Développement personnel & Productivité |

---

## 9. Rappels Git

- Travailler et pousser **sur `main`** uniquement (Règle n°1).
- Messages de commit clairs, en français, style existant :
  `feat(article): sujet — angle court`.
- Pousser : `git push -u origin main` (retenter en cas d'erreur réseau).
