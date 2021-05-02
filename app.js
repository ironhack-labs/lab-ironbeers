const { response } = require('express');
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
  res.render('index');
});

app.get('/beers', (req, res) => {
  const beers = punkAPI.getBeers()
    .then(beers => res.render('beers', {beers}))
    .catch(err => console.log(err));
});

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom()
    .then(randomBeer => res.render('random-beer', {randomBeer}))
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
