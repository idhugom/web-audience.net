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
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
