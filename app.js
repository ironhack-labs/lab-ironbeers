const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

const randomBeer = punkAPI.getRandom();

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
  punkAPI
    .getBeers()
    // success
    .then(dataBack => {
      console.log('dataBack:', dataBack);
      res.render('beers', { beers: dataBack });
    })
    // failure state
    .catch(err => {
      console.log(err);
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    // success
    .then(randomBeer => {
      res.render('random-beer', { randomBeer: randomBeer });
    })
    // failure state
    .catch(err => {
      console.log(err);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
