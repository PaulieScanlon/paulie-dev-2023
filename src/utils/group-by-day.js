import days from '../utils/days';

const groupByDay = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const { date } = item.data;

    const day = days[new Date(date).getDay()];
    const year = new Date(date).getFullYear();

    if (!acc[day]) {
      acc[day] = {};
    }

    if (!acc[day][year]) {
      acc[day][year] = [];
    }

    acc[day][year].push({
      id: item.id,
    });

    return acc;
  }, {});

  return groupedData;
};

export default groupByDay;
