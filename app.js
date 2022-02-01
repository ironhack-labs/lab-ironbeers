const { response } = require('express');
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
// hbs.registerPartials(`${__dirname}/views/partials/`)

// Add the route handlers here:

// ---- Index Route
app.get('/', (req, res) => {
  res.render('index');
});

// ---- Beeers page Route
app.get('/beers', (req, res) => {

  // beersFromApi es una promesa pendiente
  const beersFromApi = punkAPI.getBeers()

  // Si la promesa se cumple
  beersFromApi.then(beers => res.render('beers-page', { theBeers: beers }))

  // Si la promesa no se cumple
  beersFromApi.catch(error => console.log(error))
})

// ---- Single Beer page Route
app.get('/beers/:id', (req, res) => {

  const beerId = req.params.id

  const singleBeer = punkAPI.getBeer(beerId)

  singleBeer.then(beer => res.render('single-beer-page', { theSingleBeer: beer }))

  singleBeer.catch(error => console.log(error))
})

// ---- Random Beer page Route
app.get('/random-beer', (req, res) => {

  // randomBeerFromApi es una promesa pendiente
  const randomBeerFromApi = punkAPI.getRandom()

  // Si la promesa se cumple
  randomBeerFromApi.then(responseFromApi => res.render('random-beers-page', { theRandomBeer: responseFromApi }))

  // Si la promesa no se cumple
  randomBeerFromApi.catch(error => console.log(error))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
