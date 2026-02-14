const axios = require('axios');

const CACHE_DURATION = 60; //секунди

module.exports = async (req, res) => {
  try {
    const response = await axios.get('https://services.swpc.noaa.gov/products/alerts.json');
    const data = response.data;
    const latestMessage = data[0]; //останнє повідомлення

    res.setHeader('Cache-Control', `s-maxage=${CACHE_DURATION}, stale-while-revalidate`);
    
    res.status(200).json(latestMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};