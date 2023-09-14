const axios = require('axios');

const fetchWeatherData = async (location) => {
  try {
    const apiKey = '0c9c81cf20a2c76b9672f13aec326da7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    return weatherData;
  } catch (error) {
    throw error;
  }
};

module.exports = fetchWeatherData;
