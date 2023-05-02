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

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index-page');
});

app.get('/beers', (req, res) => {
  const beerList = punkAPI
  .getBeers()
  .then(beersFromApi => res.render('beers', {beerList: beersFromApi}))
  .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI
  .getRandom()
  .then(responseFromAPI => res.render('random-beer', {randomBeer: responseFromAPI}))
  .catch(error => console.log(error));

});
app.get('/beers/:id', (req, res) => {
  console.log("Starting Page: ", req.params['id'])
  const id = req.params['id']
const beerId = punkAPI
  .getBeer(id)
  .then(beersFromApi => res.render('beers', {beerId: beersFromApi}))
  .catch(error => console.log(error));})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
