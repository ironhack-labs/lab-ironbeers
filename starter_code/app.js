const express = require('express');
const hbs = require('hbs');

const app = express();
const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

// eslint-disable-next-line no-unused-vars
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(`${__dirname}/views/partials`);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then((beers) => {
      // console.log(beers[0].food_pairing);
      res.render('beers', { beers });
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then((beers) => {
      res.render('randomBeer', { beers });
    });
});

app.listen(3000);
