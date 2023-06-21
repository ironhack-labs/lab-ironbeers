const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
// const punkAPI = require('punkAPI');

const app = express();
const punkAPI = new PunkAPIWrapper();

// console.log(punkAPI);
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

app.get('/', (req, res, next) => res.render('index'));

app.get('/home', (req, res, next) => res.render('home'));

// app.get('/beers', (req, res, next) => res.render('beers', punkAPI));

app.get('/beers', (req, res) => {
  // Call the getBeers() method to retrieve the beers from the remote database
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // Pass the beers array to the beers.hbs view
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => {
      console.log(error);
      // Handle the error appropriately (e.g., display an error page)
      res.render('error', {
        error: 'Failed to retrieve beers from the database'
      });
    });
});

app.get('/random', (req, res) => {
  // Call the getRandom() method to retrieve a random beer from the remote database
  punkAPI
    .getRandom()
    .then(beerFromApi => {
      // Pass the beer object to the random-beer.hbs view
      res.render('random', { beer: beerFromApi[0] });
    })
    .catch(error => {
      console.log(error);
      // Handle the error appropriately (e.g., display an error page)
      res.render('error', {
        error: 'Failed to retrieve random beer from the database'
      });
    });
});

// Add the route handlers here:

app.listen(3000, () => console.log('🏃‍ on port 3000'));
