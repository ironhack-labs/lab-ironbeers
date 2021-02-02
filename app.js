const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const data = {
        beer: beersFromApi
      res.render('beers', data);
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const data = {
        beer: beersFromApi
      };
      const randBeer = Math.floor(Math.random() * data.beer.length);
      console.log(randBeer);
      res.render('random-beer', data.beer[randBeer]);
    })
    .catch(error => console.log(error));
});

// http://127.0.0.1:3000/beers/beer-5

app.get('/beers/beer-:donaldduck', (req, res) => {
  punkAPI
    .getBeer(req.params.donaldduck) // this is the magic bit
    .then(beerFromApi => {
      console.log(beerFromApi);
      res.render('selected-beer', beerFromApi[0]);
    })
    .catch(error => console.log(error));
});

app.get(''); // what for?

app.listen(3000, () => console.log('🏃‍ on port 3000'));
