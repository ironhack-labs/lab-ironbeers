
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();



app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log({beers});
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })
});
app.get('/random-beer', (req, res, next) => {
  res.render('random-beer');
});


app.listen(3000);
