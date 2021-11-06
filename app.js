const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

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
  const randomBeerObj = randomBeer[0];
  randomBeerObj.ranBeer = true;
  res.render('random-beer', randomBeerObj);
});

app.get('/beers/:id', async (req, res) => {
  const beer = await punkAPI.getBeer(req.params.id);
  res.render('random-beer', ...beer);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
