const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  let beers = punkAPI.getBeers();
  beers.then(beersFromApi => {
    res.render('beers',beersFromApi);
  });
});

app.get('/random-beer', (req, res) => {
  let randomBeer = punkAPI.getRandom();
  randomBeer.then(randomBeerReturned => {
    res.render('random-beer',randomBeerReturned[0]);
  })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
