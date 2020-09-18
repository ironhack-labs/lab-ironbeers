const express = require('express');

const hbs = require('hbs');
const path = require('path');
const { nextTick } = require('process');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(punks => res.render('beers', { punks, css: [] }))
    .catch(err => console.log(err));
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(randomBeer => res.render('randomBeers', { randomBeer, css: [] }))
    .catch(err => console.log(err));
});

app.get('/beers/:id', (req, res, next) => {
  punkAPI
    .getBeer(req.params.id)
    .then(dbRes => {
      console.log(dbRes);
      res.render({ beer: dbRes });
    })
    .catch(next);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
