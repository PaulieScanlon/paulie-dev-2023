const groupByDay = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const {
      slug,
      data: { date },
    } = item;

    const localeDate = new Date(date)
      .toLocaleString('en-GB', {
        weekday: 'short',
        year: 'numeric',
      })
      .split(' ');

    const day = localeDate[1];
    const year = localeDate[0];

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
