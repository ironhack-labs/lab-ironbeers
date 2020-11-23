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
// hbs.registerPartials(`${__dirname}/views/partials`)

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  // getBeers() returns a promise that should be resolved with an array of 25 beers.
  try {
    const beers = await punkAPI.getBeers()
    console.log(beers)
    res.render('beers', {beers})
  } catch (error) {
    console.log(error)
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const randomBeer = await punkAPI.getRandom();
    console.log(randomBeer)
    res.render('random-beer', randomBeer[0]);
  } catch (error) {
    console.log(error)
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
