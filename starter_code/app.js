const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('home', {
    pageTitle: 'home',
  });
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then((beers) => {
      res.render('beers', { beers });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/random-beers', (req, res, next) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer
    .then((beer) => {
      res.render('random', { beer });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000);
