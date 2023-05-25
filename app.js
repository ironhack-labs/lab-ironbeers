const express = require('express');
const axios = require('axios');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req,res) => {
  const beersArray = punkAPI
  .getBeers()
  .then(allBeers => res.render('beers', {allBeers : allBeers}))
  .catch(err => console.log(err))
});

app.get('/random-beer', (req,res) => {
  const randomBeer = punkAPI
  .getRandom()
  .then(beer => res.render('random-beer', {beer}))
  .catch(err => console.log(err))

});

app.get('/test', (req,res) => {
  const beersArray = punkAPI
  .getBeers()
  .then(allBeers => res.render('beers', {allBeers : allBeers}))
  .catch(err => console.log(err))
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

