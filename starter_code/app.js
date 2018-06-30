
const express = require('express');
const hbs     = require('hbs');
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const cows    = require('cows');
const punkAPI = new PunkAPIWrapper();

const app     = express();
const vacas   = cows();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', { beers:beers});
    })
    .catch(error => {
      console.log(error);
  })
});

app.get('/randomBeers', (req, res, next) => {
  res.render('randomBeers');
});

app.listen(3000);
console.log('App inicianlizada');
