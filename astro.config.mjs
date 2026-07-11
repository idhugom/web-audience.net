// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import { remarkCallouts } from './src/plugins/remark-callouts.mjs';

// Production canonical domain. The Cloudflare *.pages.dev preprod serves the
// same build; canonical URLs intentionally point at the production domain.
export default defineConfig({
  site: 'https://www.web-audience.net',
  trailingSlash: 'ignore',
  build: {
    // Directory format: article pages are emitted as /{slug}.html/index.html
    // (the route param carries the ".html"). Cloudflare Pages then serves
    // /{slug}.html with a 200 — preserving the source site's exact URLs —
    // instead of 308-redirecting a real .html file to its extensionless form.
    format: 'directory',
  },
  markdown: {
    remarkPlugins: [remarkDirective, remarkCallouts],
    gfm: true,
    smartypants: true,
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/recherche'),
      serialize(item) {
        // Normalise trailing slashes so sitemap URLs match the canonicals:
        // articles => /{slug}.html, sections => /blog, /thematiques/x, etc.
        const url = new URL(item.url);
        let path = url.pathname;
        if (path !== '/') path = path.replace(/\/$/, '');
        item.url = url.origin + path;
        return item;
      },
    }),
  ],
});
