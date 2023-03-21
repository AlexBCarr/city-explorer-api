'use strict'

console.log('Yes our first server!!');


// *** REQUIRES ****

const express = require('express');
require('dotenv').config();
const cors = require('cors');


let data = require('/.data/weather.json');


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

app.get('/hello', (request, response) => {
  console.log(request.query);
  let userFirstName = request.query.firstName;
  let userLastName = request.query.lastName;

  response.status(404).send(`Hello ${userFirstName} ${userLastName}! Welcome to my server!`);
});

app.get('/weather', (request, response) => {
  try {
    // let queriedWeather = request.query.weather;(
    // let dataToGroom = data.find
    // let dataToSend = new (dataToGroom)



    let foundWeather = data.find(hahah => hahah.weather === queriedWeather);
    response.status(200).send(`You are looking for a ${queriedWeather}`);
  } catch (error) {
    next(error);
  }
});



class hahah {
  constructor(weatherObj){
    this.
    this.
  }
}

// *** CATCH ALL - BE AT THE BOTTOM AND SERVE AS A 404 ERROR MESSAGE
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});
