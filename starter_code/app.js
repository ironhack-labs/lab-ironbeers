
const express = require('express');
const path    = require('path');
const expressLayouts = require('express-ejs-layouts');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const app     = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then( beers => {
    res.render('beers', { beers} );
  })
  .catch(error => {
    console.log(error)
  });
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then( beers => {
    res.render('random-beers', { beers });
  })
  .catch(error => {
    console.log(error)
  })
});

app.listen(3000);
