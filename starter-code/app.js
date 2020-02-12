const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log(beersFromApi);
      response.render('beers', { beersFromApi });
    })
    .catch(error => {
      // If it fails, the function passed to .catch runs
      // ...
      console.log('failure');
      console.log(error);
    });
});

app.get('/random-beers', (request, response) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log(beersFromApi);
      response.render('randomBeer', { responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
