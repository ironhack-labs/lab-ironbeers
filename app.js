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
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const beerArray = await punkAPI.getBeers();
  try {
    res.render('beers', {
      doctitle: 'Beers',
      beers: beerArray
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/random-beer', async (req, res) => {
  const [
    {
      name,
      image_url,
      tagline,
      food_pairing,
      brewers_tips,
      description,
      doctitle: doctitle = 'Random Beers'
    }
  ] = await punkAPI.getRandom();
  try {
    res.render('random-beer', {
      name,
      image_url,
      tagline,
      food_pairing,
      brewers_tips,
      description,
      doctitle
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
