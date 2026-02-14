const axios = require('axios');

const CACHE_DURATION = 30 * 60; //30 хв

module.exports = async (req, res) => {
  try {
    const response = await axios.get('https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json');
    const latestData = response.data[response.data.length - 1];
    const [time, kp, a_running, station_count] = latestData;

    const result = {
      time: time,
      kp: kp,
      a_running: a_running,
      station_count: station_count,
    };

    // HTTP CDN кешування через Cache-Control
    res.setHeader(
      'Cache-Control',
      `s-maxage=${CACHE_DURATION}, stale-while-revalidate`
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
};