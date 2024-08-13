const { error } = require('console');
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

app.get('/beers', (req, res) => {
  const getBeers = async () => {
    try {
      const beers = await punkAPI.getBeers();
      res.render('beers', { beers });
    } catch (error) {
      console.log(error);
    }
  };
  getBeers();
});

app.get('/random-beer', (req, res, next) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer
    .then(beer => {
      res.render('random-beer', { beer });
    })
    .catch(error => console.log(error));
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
