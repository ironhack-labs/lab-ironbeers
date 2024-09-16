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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  const fetchBeers = async () => {
    try {
      const beers = await punkAPI.getBeers();
      res.render('beers', { beers });
    }
    catch (error) {
      // Handle the error
      console.error(error);
    }
  }
  fetchBeers();
});

app.get('/random-beer', (req, res) => {
  const fetchRandomBeer = async () => {
    try {
      const randomBeer = await punkAPI.getRandom();
      res.render('random-beer', { randomBeer });
    }
    catch (error) {
      // Handle the error
      console.error(error);
    }
  }
  fetchRandomBeer();
});


hbs.registerPartials(path.join(__dirname, '/views/partials'));


app.listen(3000, () => console.log('🏃‍ on port 3000'));
