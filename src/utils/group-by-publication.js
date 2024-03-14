const groupByPublication = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const { publication, logo } = item.data;

    const key = publication;

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

  return Object.keys(groupedData).map((key) => groupedData[key]);
};

export default groupByPublication;
