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

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(dbRes => {
      console.log('Beers from the DB: ', dbRes);
      res.render('beers.hbs', {
        beers: dbRes
      });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(dbRes => {
      //console.log('Random beer from the DB: ', dbRes);
      res.render('random-beer.hbs', {
        randomBeer: dbRes[0]
      });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/beers/:id', (req, res, next) => {
  punkAPI
    .getBeer(req.params.id)
    .then(dbRes => {
      res.render('beerDetails.hbs', {
        beer: dbRes[0]
      });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => console.log('🏃‍ on port http://localhost:3000'));
