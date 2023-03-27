'use strict';
const axios = require('axios');

let cache = {};

async function getWeather (request, response, next){
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityFront = request.query.searchQuery;
    let cityCache = `${cityFront}`;

    if (cache[cityCache] && (Date.now() - cache[cityCache].timestamp) < 100000) {

      console.log('Weather: Cache has been hit!!!', cache);
      response.status(200).send(cache[cityCache].data);
    } else {
      console.log('Weather: Not items in cache');

      let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;

    let weatherResults = await axios.get(url);
    console.log(weatherResults.data);

    let weatherToSendOut = weatherResults.data.data.map(dayObj => new Forecast(dayObj));

    cache[cityCache] = {
      data: weatherToSendOut,
      timestamp: Date.now()
    };

    console.log('Added to cache:', cache);

    }

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