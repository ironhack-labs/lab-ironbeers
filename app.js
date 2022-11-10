const express = require('express');

const hbs = require('hbs');
const { resolve } = require('path');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers});
  })
  .catch(error => console.log(error));
});

app.get('/randomBeer', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    beers[0]['random'] = true;
    res.render('randomBeer', {beers});
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
