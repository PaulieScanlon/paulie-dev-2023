const groupByReferrer = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const { referrer } = item;
    const url = referrer !== null && referrer.includes('paulie.dev') ? 'https://www.paulie.dev/' : referrer;
    const key = url;

    if (!acc[key]) {
      acc[key] = {
        referrer: url,
        total: 0,
      };
    }

    acc[key].total++;

    return acc;
  }, {});

  return Object.keys(groupedData)
    .map((key) => groupedData[key])
    .filter((item) => item.referrer !== null);
};

export default groupByReferrer;
