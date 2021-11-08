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
  res.render('index', { home: true });
});

app.get('/beers', async (req, res) => {
  const beersArr = await punkAPI.getBeers();
  res.render('beers', { beersArr, beers: true });
});

app.get('/random-beer', async (req, res) => {
  const randomBeer = await punkAPI.getRandom();
  console.log(randomBeer);
  res.render('random-beer', { randomBeer, rndmBeer: true });
});

app.get('/beers/:id', async (req, res) => {
  const beerID = await punkAPI.getBeer(req.params.id);
  res.render('beer-details', ...beerID);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
