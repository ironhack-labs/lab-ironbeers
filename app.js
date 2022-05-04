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
hbs.registerPartials(__dirname + '/views/');
// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log(beersFromApi);
      res.render('beers', { beerList: beersFromApi });
    })
    .catch(err => console.log(err));
});
app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      res.render('randombeer', { randomBeer });
    })
    .catch(err => console.log(err));
});
app.listen(3000, () => console.log(':runner:‍ on port 3000'));
