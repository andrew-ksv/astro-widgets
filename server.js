require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/moon', require('./api/moon'));
app.use('/api/k-index', require('./api/k-index'));
app.use('/api/astro-pics', require('./api/astro-pics'));
app.use('/api/news', require('./api/news'));
app.use('/api/latest-alert', require('./api/latest-alert'));
app.use('/api/k-forecast', require('./api/k-forecast'));

//Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});