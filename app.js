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
  let results = []
  punkAPI
  .getBeers()
  .then((beers) => {
    return results = beers;
  })
  .then((beers) => {
    res.render('beers', { beers } );
  })
});

app.get('/random-beers', (req, res) => {
  let result = []
  punkAPI
  .getRandom()
  .then((beer) => {
    return result = beer;
  })
  .then((beer) => {
    res.render('random-beers', { beer } );
  })
});

app.use((req, res, next) => {
  res.render('error');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
