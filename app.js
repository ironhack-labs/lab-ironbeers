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
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers({ abv_gt: 0 }).then(beers => {
    res.render('beers', { beers });
  });
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom().then(beer => {
    res.render('random-beer', { beer: beer[0] });
  });
});

app.get('/beers/:index', (req, res) => {
  punkAPI.getBeer(req.params.index).then(beer => {
    res.render('random-beer', { beer: beer[0] });
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
