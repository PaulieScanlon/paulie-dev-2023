const groupByTable = (array) => {
  const groupedData = array.reduce((acc, obj) => {
    const { table, ...rest } = obj;
    if (!acc[table]) {
      acc[table] = [];
    }
    acc[table].push(rest);
    return acc;
  }, {});

  return groupedData;
  //   return Object.keys(groupedData).map((key) => groupedData[key]);
};

export default groupByTable;
