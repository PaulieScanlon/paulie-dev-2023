const groupByPublication = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const { publication, source, logo } = item.data;

    const key = publication || source;

    if (!key) {
      return acc;
    }

    if (!acc[key]) {
      acc[key] = {
        publication: publication,
        logo: logo,
        total: 0,
      };
    }

    acc[key].total++;

    return acc;
  }, {});

  const data = Object.keys(groupedData).map((key) => groupedData[key]);
  return data;
};

export default groupByPublication;
