const groupBySlug = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const { slug, title } = item;

    if (acc[slug]) {
      acc[slug].total += 1;
    } else {
      acc[slug] = {
        title: title,
        slug: slug,
        total: 0,
      };
    }
    return acc;
  }, {});

  return Object.values(groupedData);
};

export default groupBySlug;
