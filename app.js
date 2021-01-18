const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const beerData = await punkAPI.getBeers({'abv_gt': 8});
  res.render('beers.hbs', {beerData});
  console.dir(req.path);
});

app.get('/random-beer', async (req, res) => {
  const beerRandom = await punkAPI.getRandom();
  res.render('random-beers.hbs', {beerRandom});
  console.log(beerRandom);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

