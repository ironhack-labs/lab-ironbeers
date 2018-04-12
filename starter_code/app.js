
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.set('layout', __dirname + '/views/layout.hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  // response.render('beers.hbs');
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {beers});
      console.log(beers);
    })
    .catch(error => {
      console.log(error)
    })
});

app.get('/random-beers', (req, res, next) => {
    punkAPI.getRandom()
    .then(beers => {
      res.render('randomBeer', {randombeer: beers[0]});
    })
    .catch(error => {
      console.log(error)
    })
})


app.listen(3000);