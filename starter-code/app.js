const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
// Iteration 5 - Beer partioal
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

// Iteration 3.1
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((allBeersFromApi) => {
      console.log('Beers from the database: ', allBeersFromApi);
      res.render('beers', { beers: allBeersFromApi });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Iteration 4.1
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then((randomBeerFromApi) => {
      res.render('random-beer', { randomBeer: randomBeerFromApi });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Iteration 6
// ???

app.listen(3000, () => console.log('🏃‍ on port 3000'));
