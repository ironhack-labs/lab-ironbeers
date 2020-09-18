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

// ...

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const beers = await punkAPI.getBeers();
    // console.log(beers);
    res.render('beers', { beers });
  } catch (err) {
    console.error(err);
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const randomBeers = await punkAPI.getRandom();
    console.log(randomBeers);
    res.render('random-beer', { randomBeers });
  } catch (err) {
    console.error(err);
  }
});

app.listen(3002, () => console.log('🏃‍ on port 3002'));
