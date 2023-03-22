'use strict';

console.log('Yes our first server :)!!');


// *** REQUIRES ****

const express = require('express');
require('dotenv').config();
const cors = require('cors');


let weather = require('/.data/weather.json');


// *** once we breing in express we call it to create server ****
// *** app === server ***
const app = express();

// *** MIDDLEWARE - CORS
app.use(cors());

// *** PORT THAT SERVER WILL RUN ON ***
const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=> console.log(`we are running on port ${PORT}!`));


// *** ENDPOINTS *****

// *** BASE ENDPOINT - PROOF OF LIFE
// *** 1ST ARG - STRING URL IN QUOTES
// *** 2ND ARG - CALLBACK THAT WILL EXECUTE WHEN THAT ENDPOINT IS HIT

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});


app.get('/weather', (request, response, next) => {
  try {

    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityName = request.query.searchQuery;

    console.log(request.query);
    console.log(lat, lon);

    let city = weather.find(city => city.city_name.toLowerCase() === cityName.toLowerCase());

    let weatherToSend = city.data.map(day => new Forecast(day));

    request.status(200).send('weatherToSend');

    console.log(weatherToSend);


  } catch (error) {
    next(error);
  }
});



class Forecast {
  constructor(dayObj){
    this.date = dayObj.valid_date;
    this.description = dayObj.weather.description;

  }
}

// *** CATCH ALL - BE AT THE BOTTOM AND SERVE AS A 404 ERROR MESSAGE
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
  console.log(next);
});
