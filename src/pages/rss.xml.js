import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { createExcerpt } from '../utils/create-excerpt';

export const GET = async (context) => {
  const articles = await getCollection('articles');
  const demos = await getCollection('demos');
  const opensource = await getCollection('opensource');
  const posts = await getCollection('posts');
  const streams = await getCollection('streams');

  const collections = [...articles, ...demos, ...opensource, ...posts, ...streams];

  return rss({
    title: 'paulie.dev',
    description: 'RSS Feed from paulie.dev',
    site: context.site,
    // stylesheet: '/rss/styles.xsl',
    items: collections
      .map((collection) => {
        return {
          title: collection.data.title,
          pubDate: collection.data.date,
          description: `${createExcerpt(collection.body).substring(0, 160)}...`,
          link: `${context.site}${collection.data.base}/${collection.slug}/`,
        };
      })
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()),
    customData: `<language>en</language>`,
  });
};
