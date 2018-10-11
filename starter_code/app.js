
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
//const port= 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/main');


app.get('/', (req, res, next) => {
  res.render('home');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers});
    console.log(beers);
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random', (req, res, next) => {
  res.render('random-beer');
});

app.listen(3000);
