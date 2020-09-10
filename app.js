// ------------ Declarations
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();

const punkAPI = new PunkAPIWrapper();

// ------------ Configurations
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// ------------ Code

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res) => {
  // res.render('beers',{});
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/randombeer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('randombeer', { responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.listen(1234, () => console.log('🏃‍ on port 1234'));
