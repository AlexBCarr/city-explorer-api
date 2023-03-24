'use strict';
const axios = require('axios');


async function getMovie (request, response, next){

  try {

    let city = request.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_KEY}&query=${city}`;
    let movieResultsFromAxios = await axios.get(url);

    let moviesToSendOut = movieResultsFromAxios.data.results.map(movieData => new Movie(movieData));

    console.log(moviesToSendOut);

    response.status(200).send(moviesToSendOut);

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