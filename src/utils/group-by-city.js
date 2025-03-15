const groupByCity = (array) => {
  const groupedData = array.reduce((acc, item) => {
    const { flag, country, city, latitude, longitude } = item;

    // Filter out the city if it's "Worthing"
    if (city.toLowerCase() === 'worthing') {
      return acc;
    }

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

  return Object.values(groupedData);
};

export default groupByCity;
