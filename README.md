# web-audience.net

Refonte « très web » de web-audience.net — média francophone qui décrypte le web et la vie connectée.

- **Stack** : [Astro](https://astro.build) (sortie statique), design system bleu maison, light mode only.
- **Recherche** : [Pagefind](https://pagefind.app) (index statique).
- **Contenu** : articles migrés depuis l'API WordPress `wtrns.fr` (titres & slugs conservés), corps intégralement réécrit via OpenAI `gpt-5.6-terra`. Images à la une réutilisées quand disponibles, sinon générées via `gpt-image-2`.

## Développement

```bash
npm install
npm run dev        # serveur local
npm run build      # build de production -> dist/ (+ index Pagefind)
```

## Déploiement

- **Plateforme** : Cloudflare Pages
- **Branche de production** : `main`
- **Commande de build** : `npm run build`
- **Répertoire de sortie** : `dist`
- **Répertoire racine** : (vide)

## Scripts de migration

```bash
node scripts/fetch-posts.py                      # récupère les métadonnées des posts
node scripts/images.mjs   --batch data/batch.json # images (réutilise / génère)
node scripts/generate.mjs --batch data/batch.json # contenu (gpt-5.6-terra)
```
