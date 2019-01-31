
const express = require('express');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const expressLayouts = require('express-ejs-layouts');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/Beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers});

  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/RandomBeers', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('randomBeers', {beers});

  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(3000);
