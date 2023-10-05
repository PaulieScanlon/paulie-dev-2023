import days from '../utils/days';

const groupByDay = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const {
      slug,
      data: { date },
    } = item;

    const day = days[new Date(date).getDay()];
    const year = new Date(date).getFullYear();

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

  return Object.fromEntries(days.map((day) => [day, groupedData[day]]));
};

export default groupByDay;
