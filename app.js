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

app.get('/', (req, res) => {
  const image = '/images/beer.png';
  const beersListLink = '/views/beers';
  const randomBeer = '/views/random-beer';

  res.render('index', { image, beersListLink, randomBeer });
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers.hbs', { beersFromApi }))
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      res.render('random-beer.hbs', { randomBeer });
    })
    .catch(error => console.log(error));
});

// res.render('index', { image, beersListLink, randomBeer });

app.listen(3000, () => console.log('🏃‍ on port 3000'));
