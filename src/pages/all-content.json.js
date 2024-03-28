import { getCollection } from 'astro:content';
import ghosts from '../content/ghosts/ghost-content.json';

export const GET = async ({ params, request }) => {
  const articles = await getCollection('articles');
  const demos = await getCollection('demos');
  const opensource = await getCollection('opensource');
  const posts = await getCollection('posts');
  const streams = await getCollection('streams');

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

  return new Response(JSON.stringify({ articles, demos, opensource, posts, streams, ghosts, collections, search }));
};
