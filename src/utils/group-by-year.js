import months from '../utils/months';

const groupByYear = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const { date } = item.data;

    const month = months[new Date(date).getUTCMonth()];
    const year = new Date(date).getUTCFullYear();

    if (!acc[year]) {
      acc[year] = {};
    }

    if (!acc[year][month]) {
      acc[year][month] = [];
    }

    acc[year][month].push({
      id: item.id,
    });

    return acc;
  }, {});

  return groupedData;
};

export default groupByYear;
