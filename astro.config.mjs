// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import { remarkCallouts } from './src/plugins/remark-callouts.mjs';

// Production canonical domain. The Cloudflare *.pages.dev preprod serves the
// same build; canonical URLs intentionally point at the production domain.
export default defineConfig({
  site: 'https://www.web-audience.net',
  // Cloudflare Pages normalises static paths: real *.html files are
  // 308-redirected to their extensionless form, while directories get a
  // trailing slash. To KEEP the ".html" in article URLs, each post is emitted
  // as /{slug}.html/index.html and the whole site canonicalises to trailing
  // slashes — so /{slug}.html/ serves 200 and the source's /{slug}.html
  // (no slash) 308-redirects to it (SEO-safe, extension preserved).
  trailingSlash: 'always',
  build: {
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
        // Ensure every sitemap URL has a trailing slash, matching the 200-
        // served canonical form (/{slug}.html/, /blog/, /thematiques/x/…).
        const url = new URL(item.url);
        if (!url.pathname.endsWith('/')) item.url = url.origin + url.pathname + '/';
        return item;
      },
    }),
  ],
});
