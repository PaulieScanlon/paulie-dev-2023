const groupByDate = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const date = new Date(item.date);
    const day = date.getDate().toString().padStart(2, '0');
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const key = `${day}-${month}`;

    if (!acc[key]) {
      acc[key] = {
        day: day,
        month: month,
        total: 0,
      };
    }

    acc[key].total++;

    return acc;
  }, {});

  return Object.keys(groupedData).map((key) => groupedData[key]);
};

export default groupByDate;
