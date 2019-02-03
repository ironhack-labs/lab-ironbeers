
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers})
    })
  .catch(error => {
    res.render('beers',{error})
    console.log(error);
  })
});

app.get('/random', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    console.log(beers);
    res.render('random', {beers})
  })
  .catch(error => {
    res.render('random', {error})
    console.log(error)
  })
});

app.listen(3000);
