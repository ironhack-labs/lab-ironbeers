const { error } = require('console');
const express = require('express');
const res = require('express/lib/response');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
// Register the location for handlebars partials here:

// Add the route handlers here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(error);
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(random => {
      let beer = random[0];
      res.render('random-beer', beer);
    })
    .catch(error);
});

app.get('/', (req, res, next) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
