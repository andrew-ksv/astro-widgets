const axios = require('axios');

module.exports = async (req, res) => {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;

    try {
        const response = await axios.get(`https://gnews.io/api/v4/search?q=astronomy%20space&lang=en&max=25&apikey=${NEWS_API_KEY}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from News API');
    }
};