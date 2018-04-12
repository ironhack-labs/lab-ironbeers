'use strict';

const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// ------- configure app

app.set('views', path.join(__dirname, '/views'));

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// ------ routes

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beersResults => {
      // console.log(beersResults[0]);
      const data = {beersResults};
      res.render('beers', data);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/randombeer', (req, res, next) => {
  punkAPI.getRandom()
    .then(randomBeer => {
      // console.log(randomBeer[0])
      const randomData = { randomBeer: randomBeer[0] };
      res.render('randombeer', randomData);
    })
    .catch(error => {
      console.log(error);
    });
});

// ------start app

app.listen(3000, () => console.log('listening on port 3000!'));
