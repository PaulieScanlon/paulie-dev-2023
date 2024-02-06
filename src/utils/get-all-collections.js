import { getCollection } from 'astro:content';

export const articles = await getCollection('articles');
export const demos = await getCollection('demos');
export const opensource = await getCollection('opensource');
export const posts = await getCollection('posts');
export const streams = await getCollection('streams');

export const collections = [...articles, ...demos, ...opensource, ...posts, ...streams];

export const search = collections
  .filter((item) => item.data.draft !== true)
  .map((data) => {
    const {
      slug,
      data: { base, title, date },
    } = data;

    return {
      date: date,
      title: title,
      path: `/${base}/${slug}`,
    };
  })
  .sort((a, b) => b.date - a.date);
