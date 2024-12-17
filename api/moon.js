const axios = require('axios');

module.exports = async (req, res) => {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    const today = new Date().toISOString().slice(0, 10);

    try {
        const response = await axios.get
        (`https://api.weatherapi.com/v1/astronomy.json?key=${WEATHER_API_KEY}&q=auto:ip&dt=${today}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
};