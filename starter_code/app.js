const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  // res.render('beerPartial');
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(error => {
      throw new Error(error);
      // console.log(error);
    })
});


app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('randomBeers',{beers});
  })
  .catch(error => {
    throw new Error(error);
  })
});

app.listen(3000);
