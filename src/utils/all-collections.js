import { getCollection } from "astro:content";

// Helper function to get all collections
export async function getAllCollections() {
  const [articles, demos, opensource, posts, streams, ghosts, docs] = await Promise.all([
    getCollection("articles"),
    getCollection("demos"),
    getCollection("opensource"),
    getCollection("posts"),
    getCollection("streams"),
    getCollection("ghosts"),
    getCollection("docs")
  ]);

  const collections = [...articles, ...demos, ...opensource, ...posts, ...streams, ...ghosts, ...docs];

  const search = collections
    .filter((item) => item.data.draft !== true)
    .map((data) => {
      const {
        slug,
        data: { base, title, date }
      } = data;

      return {
        date: new Date(date).toISOString(),
        title: title,
        base: base,
        path: `/${base}/${slug}`
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    articles,
    demos,
    opensource,
    posts,
    streams,
    ghosts,
    docs,
    collections,
    search
  };
}
