'use strict';
const axios = require('axios');

let cache = {};


async function getMovie (request, response, next){

  try {

    let city = request.query.searchQuery;

    let key = `${city}`;


    if(cache[key] && (Date.now() - cache[key].timestamp) < 10000) {
      console.log('Cache was hit!!');

      response.status(200).send(cache[key].data);

    } else {

      console.log('No items in cache');

      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_KEY}&query=${city}`;

      let movieResultsFromAxios = await axios.get(url);

      let moviesToSendOut = movieResultsFromAxios.data.results.map((movieData) => new Movie(movieData));

      cache[key] = {
        data:moviesToSendOut,
        timestamp: Date.now(),
      };

    }

  } catch (error) {
    next(error);
  }
}

class Movie {
  constructor(movieData) {
    this.data = movieData;
  }
}

module.exports = getMovie;