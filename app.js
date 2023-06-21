const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
// Add the route handlers here:

app.get('/', (req, res, next) => {
  const filePath = path.join(__dirname, 'views', 'index.html');
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const beerArray = punkAPI.getBeers();
  beerArray.then(beerArray => {
    res.render('beers', { beerArray });
  });
});

app.get('/random-beer', (req, res, next) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer.then(randomBeer => {
    res.render('random-beer', { randomBeer });
  });
});

app.listen(80, () => console.log('🏃‍ on port 80'));
