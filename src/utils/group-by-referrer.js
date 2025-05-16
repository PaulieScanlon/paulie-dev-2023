const groupByReferrer = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const { referrer } = item;
    const url = referrer;
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

  const group = Object.keys(groupedData)
    .map((key) => groupedData[key])
    // .filter((item) => item.referrer !== null)
    .filter((item) => {
      const domain = new URL(item.referrer).hostname.toLowerCase();
      return !['paulie.dev'].some((excluded) => domain.includes(excluded));
    });

  return group;
};

export default groupByReferrer;
