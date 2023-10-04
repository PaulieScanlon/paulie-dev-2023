const groupByReaction = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const { reaction } = item;
    const key = reaction;

    if (!acc[key]) {
      acc[key] = {
        reaction: reaction,
        total: 0,
      };
    }

    acc[key].total++;

    return acc;
  }, {});

  return Object.keys(groupedData)
    .map((key) => groupedData[key])
    .sort((a, b) => b.total - a.total);
};

export default groupByReaction;
