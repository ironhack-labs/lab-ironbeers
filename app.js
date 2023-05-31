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

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(arr => {
      const beerList = arr.slice(0, 25);
      const data = {
        finalBeerList: beerList
      };

      res.render('beers', data);
    })
    .catch(err => console.log('Sorry, we are dry.'));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(lonelyArr => {
      const data = {
        lonelyBeer: lonelyArr[0]
      };

      res.render('random-beer', data);
    })
    .catch(err => console.log('Sorry, we are dry.'));
});

app.listen(4000, () => console.log('🏃‍ on port 4000'));
