'use strict';
const axios = require('axios');

async function getWeather (request, response, next){
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;

    let weatherResults = await axios.get(url);
    console.log(weatherResults.data);

    let weatherToSendOut = weatherResults.data.data.map(dayObj => new Forecast(dayObj));

    response.status(200).send(weatherToSendOut);

  } catch (error) {
    next(error);
  }
}

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.date;
    this.description = dayObj.weather.description;
  }
}

module.exports = getWeather;