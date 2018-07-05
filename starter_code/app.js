
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials/');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    // Call to the PunkAPI package, getBeers so lets iterate through the array?
  .then(beers => {

  res.render('beers', {beers});
  //template variable {beersArray:beers}
  //get a Beer from the package and THEN render, inside the THEN
  })
  .catch(error => {
    console.log(error);
  });
});

app.get('/random-beers', (req, res, next) => {

  punkAPI.getRandom()
  .then(beers => {



  res.render('random-beers', {theBeer:beers[0]});
  //template will have a thing called the Beer and itll be equal to first thing in that array
  })
  .catch(error => {
    console.log(error);
  });


});


app.listen(3000);
