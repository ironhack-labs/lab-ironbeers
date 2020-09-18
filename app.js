const express = require('express');

const hbs = require('hbs');
const path = require('path');
const { nextTick } = require('process');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index', { css: ['home'] });
});

app.get('/beers', async (req, res) => {
  try {
    const apiBeers = await punkAPI.getBeers();
    res.render('beers', { beers: apiBeers });
  } catch (err) {
    console.log(err);
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const apiBeers = await punkAPI.getRandom();
    res.render('random-beer', { randomBeer: apiBeers[0] });
  } catch (err) {
    console.log(err);
  }
});

app.get('/beer/:id', async (req, res) => {
  try {
    const beer = await punkAPI.getBeer(req.params.id);
    res.render('random-beer', { randomBeer: beer[0] });
  } catch (err) {
    console.log(err);
  }
});

app.listen(4000, () => console.log('🏃‍ on port http://localhost:4000'));
