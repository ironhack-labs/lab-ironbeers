const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const { request } = require('http');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get(('/random-beer'), (request, response) =>{
  punkAPI.getRandom()
  .then((randomBeer) => response.render('random-beer', {randomBeer}))
  .catch(error => console.log(error));
});

app.get('/beers', (request, response) => {
  punkAPI.getBeers()
  .then((beersArray) => response.render('beers', {beersArray}))
  .catch((error) => console.error(error));
});

app.get('/', (request, response) => {
  response.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
