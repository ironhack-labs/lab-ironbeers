
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

require('./configs/hbs.configs');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers().then(beers => {
    res.render('beers', {beers});
  })
});

app.get('/randombeer', (req, res, next) => {
  punkAPI.getRandom().then(beers => {
    console.log(beers);
    res.render('randomBeer', {beers});
  })
});

app.listen(3000, console.log('RUN!'));