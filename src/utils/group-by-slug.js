const groupBySlug = (array) => {
  const groupedData = array.reduce((acc, item) => {
    let { slug, title } = item;

    slug = slug.replace(/\/$/, '');

    if (acc[slug]) {
      acc[slug].total += 1;
    } else {
      acc[slug] = {
        title: title,
        slug: slug,
        total: 1,
      };
    }
    return acc;
  }, {});

  return Object.values(groupedData);
};

export default groupBySlug;
