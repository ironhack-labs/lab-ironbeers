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

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  let beers = await punkAPI.getBeers();
  console.log(beers);
  let data = {
    beers: beers
  };
  res.render('beers', data);
});

app.get('/beers/beer-:beerId', async (req, res) => {
  let beer = await punkAPI.getBeer(req.params.beerId);

  res.render('random-beer', beer[0]);
});

app.get('/random-beer', async (req, res) => {
  let beer = await punkAPI.getRandom();

  res.render('random-beer', beer[0]);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
