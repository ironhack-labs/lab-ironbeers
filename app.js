const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//register partials
hbs.registerPartials(path.join(__dirname + '/views/partials'));

//public
app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers.hbs', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      res.render('random-beer.hbs', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

//route for specific beer
app.get('/beers/:beerId', (req, res, next) => {
  punkAPI
    .getBeer(req.params.beerId)
    .then(beersFromApi => {
      res.render('beer-details.hbs', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

//start server
app.listen(3000);
