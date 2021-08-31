const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ROUTE HANDLERS

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Beers page
app.get('/beers', (req, res) => {

  punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render('beers-page', { beers : beersFromApi });
  })
  .catch(error => console.log(error));

});

// Random beer page
app.get('/random-beer', (req, res) => {

  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    const randomBeer = responseFromAPI[0];
    res.render('random-beer-page', randomBeer);
  })
  .catch(error => console.log(error));

});

// Beer selected by user page
app.get('/beers/:id', (req, res) => {

  punkAPI
  .getBeer(req.params.id)
  .then(selectedBeer => {
    const beer = selectedBeer[0];
    res.render('selected-beer-page', beer);
  })
  .catch(error => console.log(error));

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
