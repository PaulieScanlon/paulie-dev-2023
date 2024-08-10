import { formatSlug } from '../utils/format-slug';

import { getCollection } from 'astro:content';

export const GET = async ({ params, request }) => {
  const articles = await getCollection('articles');
  const demos = await getCollection('demos');
  const opensource = await getCollection('opensource');
  const posts = await getCollection('posts');
  const streams = await getCollection('streams');
  const ghosts = await getCollection('ghosts');

  const collections = [...articles, ...demos, ...opensource, ...posts, ...streams, ...ghosts];

  const search = collections
    .filter((item) => item.data.draft !== true)
    .map((data) => {
      const {
        slug,
        data: { base, title, date },
      } = data;

      return {
        date: date,
        title: title,
        base: base,
        path: `/${base}/${slug}`,
      };
    })
    .sort((a, b) => b.date - a.date);

  const tags = collections
    .map((collection) => {
      const tags = collection.data?.tags || [];

      return tags
        .map((tag) => {
          const slug = formatSlug(tag) || '';
          return {
            name: tag || '',
            slug,
          };
        })
        .flat();
    })
    .flat()
    .filter((item, index, self) => {
      const { name } = item;
      return name && index === self.findIndex((obj) => obj.name === name);
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return new Response(JSON.stringify({ collections, search, tags }));
};
