const groupByCity = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const { flag, country, city, latitude, longitude } = item;
    const key = `${flag}-${city}`;

    if (!acc[key]) {
      acc[key] = {
        flag: flag,
        country: country,
        city: city,
        latitude: latitude,
        longitude: longitude,
        total: 0,
      };
    }

    acc[key].total++;

    return acc;
  }, {});

  return Object.keys(groupedData).map((key) => groupedData[key]);
};

export default groupByCity;
