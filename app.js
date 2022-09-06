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
  res.render('index', {
    doctitle: 'Home'
  });
});

app.get('/beers', async (req, res) => {
  try {
    const callBeerAPI = await punkAPI.getBeers();
    res.render('beers', {
      doctitle: 'Beers',
      callBeerAPI
    });
  } catch (error) {
    console.log(error);
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const callRandomBeer = await punkAPI.getRandom();
    let [{ name }] = callRandomBeer;
    res.render('random-beer', {
      doctitle: name,
      callRandomBeer
    });
  } catch (error) {
    console.log(error);
  }
});

app.get('/beers/:id', async (req, res) => {
  try {
    const beerId = req.params.id;
    const specificBeer = await punkAPI.getBeer(beerId);
    let [{ name }] = specificBeer;
    res.render('beer', {
      doctitle: name,
      specificBeer
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
