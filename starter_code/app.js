
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

//font awesome stuff
require('./helpers');


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    // console.log(beers);
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error);
  })

});

app.get('/randomBeers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer => {
    let randomBeer = beer[0];
    console.log(beer);
    res.render('randomBeer', {randomBeer});
    // res.render('randomBeer', {randomBeer: beer});//This is the way to do it if I wanted to reuse a single card from with the randombeer API
  })
  .catch(error => {
    console.log(error);
  })
});



app.listen(3000);
