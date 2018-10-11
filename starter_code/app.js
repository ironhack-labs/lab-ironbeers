
const express = require('express');
const ejs     = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public/stylesheets')));



app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    // console.log(beers);
    res.render('beers',{beers});
  })
  .catch(error => {
    console.log(error);
  })
    
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer => {
    console.log(beer);
    res.render('random-beers',{beer});
  })
  .catch(error => {
    console.log(error);
  })
    
});



app.listen(3000);
