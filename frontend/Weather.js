import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('Patiala');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchWeather(city);
    }, []);

    const fetchWeather = async (city) => {
        try {
            const response = await axios.get(`http://localhost:5000/weather/${city}`);
            setWeather(response.data);
            setError('');
        } catch (err) {
            setError('City not found');
            setWeather(null);
        }
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            fetchWeather(city);
        }
    };

    return (
        <div className="app-main">
            <div className="header">
                <h4>WEATHER REPORT</h4>
            </div>

            <div className="searchInputBox">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleSearch}
                    placeholder="Enter city name"
                />
            </div>

            {error && <div className="error">{error}</div>}

            {weather && (
                <div className="weather-body">
                    <div className="location-details">
                        <div className="city">{weather.name}, {weather.sys.country}</div>
                        <div className="date">{new Date().toLocaleDateString()}</div>
                    </div>
                    <div className="weather-status">
                        <div className="temp">{Math.round(weather.main.temp)}&deg;C</div>
                        <div className="weather">{weather.weather[0].main}</div>
                        <div className="min-max">
                            {Math.floor(weather.main.temp_min)}&deg;C (min) / {Math.ceil(weather.main.temp_max)}&deg;C (max)
                        </div>
                        <div>Updated as of {new Date().toLocaleTimeString()}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
