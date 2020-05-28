const express = require('express');

const hbs = require('hbs');
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

app.get('/', (req, res) => {
  res.render(__dirname + '/views/home.hbs');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => res.render((__dirname + '/views/beers.hbs'), {beersFromApi}));
  .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {

  .then(responseFromAPI => {
    // your magic happens here
    punkAPI.getRandom()
  })
  .catch(error => console.log(error));
  res.render(__dirname + '/views/random-beers.hbs');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
