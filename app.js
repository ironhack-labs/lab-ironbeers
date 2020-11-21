const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

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
  res.render('beers', { beers });
});
app.get('/random-beers', async (req, res) => {
  const randomBeer = await punkAPI.getRandom();
  res.render('random-beer', randomBeer[0]);
});

app.get("/beers/beer-:beerId", async (req, res) => {
  const { beerId } = req.params;
  const thisBeer =  await punkAPI.getBeer(beerId)
  res.render('beer', thisBeer[0]);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
