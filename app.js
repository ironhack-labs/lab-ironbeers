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

// ...

app.get('/', (req, res) => {
  res.render('index.hbs');
});

// Add the route handlers here:

app.get('/beers', async (req, res) => {
  const beers = await punkAPI.getBeers();
  //console.log(beers[0]);
  res.render('allBeers', { beers });
});

app.get('/randomBeer', async (req, res) => {
  const [randomBeer] = await punkAPI.getRandom();
  //console.log('random', randomBeer);
  res.render('randomBeer', { randomBeer });
});

app.get('/beers/:beerId', async (req, res) => {
  const beerId = req.params.beerId;
  //console.log(beerId)
  const [selectedBeer] = await punkAPI.getBeer(id);
  //console.log(selectedBeer)
  res.render('beerDetails', {selectedBeer})
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
