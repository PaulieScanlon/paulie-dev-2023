import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { createExcerpt } from '../utils/create-excerpt';
import { formatDate } from '../utils/format-date';

export const GET = async (context) => {
  const articles = await getCollection('articles');
  const demos = await getCollection('demos');
  const opensource = await getCollection('opensource');
  const posts = await getCollection('posts');
  const streams = await getCollection('streams');
  const docs = await getCollection('docs');
  const ghosts = await getCollection('ghosts');

  const collections = [...articles, ...demos, ...opensource, ...posts, ...streams, ...docs, ...ghosts];

  // // Filter for February, March, April of current year
  // const currentYear = new Date().getFullYear();

  // const temp = collections
  //   .filter((collection) => {
  //     const date = new Date(collection.data.date);
  //     const month = date.getMonth();

  //     // Check if date is from Feb (1), Mar (2), or Apr (3) of current year
  //     return date.getFullYear() === currentYear && (month === 1 || month === 2 || month === 3);
  //   })
  //   .map((entry) => {
  //     const {
  //       slug,
  //       data: { date, title, base, url },
  //     } = entry;
  //     return {
  //       base,
  //       date, // Keep the original date for sorting
  //       formattedDate: formatDate(date), // Store formatted date separately
  //       title,
  //       url: base === 'posts' ? `https://www.paulie.dev/${base}/${slug}` : url,
  //     };
  //   })
  //   // Sort from oldest to newest
  //   .sort((a, b) => new Date(a.date) - new Date(b.date));

  // console.log(temp);

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
