// Setup
// -----------------------------------------------------------
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

hbs.registerPartials(__dirname + '/views/partials')


// Routes
// -----------------------------------------------------------
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      res.locals.beerList = beers;
      // res.json( beers );
      res.render('beers.hbs');
    })
    .catch(error => {
      console.log(error)
    })
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      const randomIndex = Math.floor(Math.random() * beers.length);
      res.locals.randomBeer = beers[randomIndex];
      res.render('random-beers.hbs');
    })
    .catch(error => {
      console.log(error)
    })
});




app.listen(3000);