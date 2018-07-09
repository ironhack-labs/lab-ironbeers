const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials') // Registers where my partials will be located

// Tells Express to send and render my index view to the client
app.get('/', (req, res, next) => {
  res.render('index');
});

// Will return an array of 25 beers and passes that array to the beers.hbs view
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(blah => {
    res.render('beers', {beersArray: blah});
    })
  });


  // Why is it random-beer and not randomBeer?
  app.get('/random-beer', (req, res, next) => {
    punkAPI.getRandom()
    .then(beers => {
      res.render('beers', {theBeer:beers[0]});
      })
    });



app.listen(3000);