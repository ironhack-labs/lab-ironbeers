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
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(arr => {
      res.render('beers', { finalBeerList: arr });
    })
    .catch(err => console.log('Sorry, we are dry.'));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(lonelyArr => {
      res.render('random-beer', lonelyArr[0]);
    })
    .catch(err => console.log('Sorry, we are dry.'));
});

app.get('/beers/:beer', (req, res) => {
  punkAPI
    .getBeer(req.params['beer'])
    .then(ourBeer => {
      console.log(ourBeer);
      res.render('beers', { finalBeerList: ourBeer });
    })
    .catch(err => console.log('Sorry, we are dry.'));
});

app.listen(4000, () => console.log('🏃‍ on port 4000'));
