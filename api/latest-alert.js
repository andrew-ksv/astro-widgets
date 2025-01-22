const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const response = await axios.get('https://services.swpc.noaa.gov/products/alerts.json');
    const data = response.data;
    const latestMessage = data[0]; //останнє повідомлення
    res.status(200).json(latestMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};