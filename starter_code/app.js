'use strict';
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();

const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beersresult => {
      const data = {
        beersArray: beersresult,
        somany: beersresult.length > 20
      };
      res.render('beers', data);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/randombeers', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      console.log(beers);
      const data = {beers};
      res.render('randombeers', data);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => console.log('listening on port 3000'));
