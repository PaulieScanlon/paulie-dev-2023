import days from '../utils/days';

const groupByDay = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const {
      slug,
      data: { date },
    } = item;

    const day = days[new Date(date).getUTCDay()];
    const year = new Date(date).getUTCFullYear();

    if (!acc[day]) {
      acc[day] = {};
    }

    if (!acc[day][year]) {
      acc[day][year] = [];
    }

    acc[day][year].push({
      slug: slug,
      day: day,
      year: year,
    });

    return acc;
  }, {});

  return groupedData;
};

export default groupByDay;
