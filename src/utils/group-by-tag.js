const groupByTag = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const { tags } = item.data;

    tags.forEach((tag) => {
      if (!acc[tag]) {
        acc[tag] = {
          tag: tag,
          total: 0,
        };
      }

      acc[tag].total++;
    });

    return acc;
  }, {});

  return Object.keys(groupedData).map((key) => groupedData[key]);
};

export default groupByTag;
