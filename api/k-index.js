const axios = require('axios');

const CACHE_DURATION = 30 * 60; //30 хв

module.exports = async (req, res) => {
  try {
    const response = await axios.get('https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json');
    const latestData = response.data.at(-1);

    const result = {
    time: latestData.time_tag,
    kp: latestData.Kp,
    a_running: latestData.a_running,
    station_count: latestData.station_count,
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