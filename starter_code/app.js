/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const hbs = require('hbs');

const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();
const PORT = 8080;

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(`${__dirname}/views/partials`);

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const beers = punkAPI.getBeers();
  beers.then((beersArr) => {
    res.render('beers', { beersArr });
  });
});

app.get('/random-beers', (req, res, next) => {
});

app.listen(PORT);
