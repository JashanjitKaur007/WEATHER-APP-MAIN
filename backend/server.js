// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const { default: Weather } = require('../src/Weather');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
};


// Weather API route
app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    try {
        const response = await axios.get(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`);
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ message: 'City not found' });
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
