import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../data/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 50);

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    trailingSlash: false,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/${p.id}.html`,
      categories: [p.data.category],
    })),
    customData: `<language>fr-FR</language>`,
  });
}
