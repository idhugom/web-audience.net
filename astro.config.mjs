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
    // Emit /{slug}.html to preserve the source site's existing URLs (SEO).
    format: 'file',
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
        // Articles are served at /{slug}.html — make the sitemap match the
        // canonical URLs. Section pages (/, /blog, /thematiques…) stay clean.
        const url = new URL(item.url);
        const path = url.pathname.replace(/\/$/, '');
        const isSection =
          path === '' ||
          path === '/blog' ||
          path === '/a-propos' ||
          path.startsWith('/thematiques') ||
          path.startsWith('/blog/');
        if (!isSection && /^\/[a-z0-9-]+$/i.test(path)) {
          item.url = url.origin + path + '.html';
        }
        return item;
      },
    }),
  ],
});
