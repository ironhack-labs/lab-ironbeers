
const express = require('express');
const hbs     = require('hbs');
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app     = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers().then((beerArray) => {
    res.render('beers', { beerArray });
  })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/random', (req, res, next) => {
  punkAPI.getRandom().then((randomBeer) => {
    res.render('random', { randomBeer });
  });
});

app.listen(3000);
