const axios = require('axios');

module.exports = async (req, res) => {
    const NASA_API_KEY = process.env.NASA_API_KEY;

    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?count=10&api_key=${NASA_API_KEY}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from NASA API');
    }
};