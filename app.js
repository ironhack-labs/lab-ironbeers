const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res, next) => {
  const beers = await punkAPI.getBeers(); // wait for db results
  console.log(beers);
  // res.json(beers);
  res.render('beers', { beers });
});

app.get('/random-beer', async (req, res, next) => {
  const apiRandom = await punkAPI.getRandom(); // wait for db results
  console.log(randomBeer);
  res.render('random-beer', { 'randomBeer': apiRandom[0]});
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
