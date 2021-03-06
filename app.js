const { error } = require('console');
const express = require('express');

const hbs = require('hbs');
const { get } = require('http');
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

// Create a /beers route inside the app.js file
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    //success
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
    })
    //failure status
    .catch(err => {
      console.log(err);
    });
});

// Create a /random-beer route inside the app.js file
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    //success
    .then(responseFromAPI => {
      res.render('random-beer', { randombeer: responseFromAPI });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
