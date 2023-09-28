const groupBySlug = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const { slug } = item;
    const key = slug;

    if (!acc[key]) {
      acc[key] = {
        slug: slug,
        total: 0,
      };
    }

    acc[key].total++;

    return acc;
  }, {});

  return Object.keys(groupedData).map((key) => groupedData[key]);
};

export default groupBySlug;
