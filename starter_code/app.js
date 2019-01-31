
const express = require('express');
const app     = express();
const path    = require('path');
const expressLayouts = require('express-ejs-layouts');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })
  
});

app.get('/random_beer', (req, res, next) => {
  res.render('random_beer');
});



app.listen(3000);
