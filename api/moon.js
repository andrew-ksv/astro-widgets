const axios = require('axios');

module.exports = async (req, res) => {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  const { city } = req.query;
  const today = new Date().toISOString().slice(0, 10);

  try {
    const query = city ? `q=${city}` : `q=auto:ip`;
    const response = await axios.get(`https://api.weatherapi.com/v1/astronomy.json?key=${WEATHER_API_KEY}&${query}&dt=${today}`);

    const result = {
      location: response.data.location.name,
      astronomy: response.data.astronomy.astro,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
};