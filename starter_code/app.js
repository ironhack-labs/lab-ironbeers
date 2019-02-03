
const express = require('express');

const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const expressLayouts = require('express-ejs-layouts');

const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then((beers) => {
      console.log(beers);
      res.render('beers', { beers });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
    .then((beer) => {
      res.render('random-beers', { beer: beer[0] });
    })
    .catch((error) => {
      console.log(error);
    });
});


app.listen(3000);
