import { formatSlug } from './format-slug';

export const createTagsCollection = (collections) => {
  const tags = collections
    .flatMap((collection) => collection.data?.tags || [])
    .map((tag) => ({
      name: tag || '',
      slug: formatSlug(tag) || '',
    }))
    .reduce((acc, tag) => {
      const existingTag = acc.find((item) => item.slug === tag.slug);
      if (existingTag) {
        existingTag.count += 1;
      } else {
        acc.push({ ...tag, count: 1 });
      }
      return acc;
    }, [])
    .sort((a, b) => a.name.localeCompare(b.name));
  return tags;
};
