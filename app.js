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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // console.log('getting beers', beersFromApi);
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: 'Error fetching beers' });
    });
});

app.get('/random_beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      // console.log(responseFromAPI);
      res.render('random_beer', { beer: responseFromAPI[0] });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: 'Error fetching random beer' });
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
