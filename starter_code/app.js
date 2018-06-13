
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs'); //setting hbs as an engine
app.set('views', __dirname + '/views'); //precise the folder
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  res.render('index'); //reference to views/index.hbs
});

app.get('/beers', (req, res) => {
  const beers = punkAPI.getBeers()

  .then(beers => {
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beers', (req, res) => {
  res.render('random-beers');
});


app.listen(3000);