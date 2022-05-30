const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
//It used to be: app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

//all beers
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beerApi => {
      res.render('beers', { beerApi });
    })
    .catch(error => {
      console.log('Error fetching api', error);
    });
});

//random beers
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeerApi => {
      res.render('random-beer', { randomBeerApi });
    })
    .catch(error => {
      console.log('Error fetching api', error);
      res.send('No random beers were found');
    });
});

//start server
app.listen(3000, () => console.log('🏃‍ on port 3000'));
