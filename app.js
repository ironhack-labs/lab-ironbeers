const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      let data = {
        beer: beers
      };
      res.render('beers', data);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beers', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beers => {
      let data = {
        beer: beers
      };
      res.render('randomBeer', data);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
