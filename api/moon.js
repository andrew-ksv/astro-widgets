const axios = require('axios');

module.exports = async (req, res) => {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  const { city, lat, lon } = req.query; // Приймаємо місто або координати
  const today = new Date().toISOString().slice(0, 10);

  try {
    let query = `q=auto:ip`; // За замовчуванням використовуємо IP сервера
    if (city) query = `q=${city}`;
    if (lat && lon) query = `q=${lat},${lon}`;

    const response = await axios.get(`https://api.weatherapi.com/v1/astronomy.json?key=${WEATHER_API_KEY}&${query}&dt=${today}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
};
