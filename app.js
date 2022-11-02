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

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const beers = await punkAPI.getBeers();
  console.log(beers);
  res.render('beers', { beers: beers });
});

app.get('/random-beer', async (req, res) => {
  const beers = await punkAPI.getRandom();
  console.log(beers);
  res.render('random-beers', { beers: beers });
});

app.listen(3000, () => console.log('🏃‍ on port http://localhost:3000'));
