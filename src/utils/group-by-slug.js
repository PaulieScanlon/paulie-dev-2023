const groupBySlug = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const { slug } = item;

    const parts = slug.split('/').filter((item) => item !== '');

    if (parts.length > 2) {
      // only apply a title if it's not E.g /posts/ or /articles/

      const title = parts.slice(-1)[0].split('-').join(' ');
      const key = slug;

      if (!acc[key]) {
        acc[key] = {
          title: title,
          slug: slug,
          total: 0,
        };
      }

      acc[key].total++;
    }
    return acc;
  }, {});

  return Object.keys(groupedData).map((key) => groupedData[key]);
};

export default groupBySlug;
