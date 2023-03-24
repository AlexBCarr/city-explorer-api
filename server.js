'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());

const getWeather = require('./modules/weather.js');
const getMovie = require('./modules/movies.js');




const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`We're up and running on port ${PORT}!`));



app.get('/movie', getMovie);
app.get('/weather', getWeather);


app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
  next(error.message);
});