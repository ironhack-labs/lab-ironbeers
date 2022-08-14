const { log } = require('console');
const express = require('express');
const app = express();

const hbs = require('hbs');
const path = require('path');

const punkApiWrapper = require('punkapi-javascript-wrapper');
const punkApi = new punkApiWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkApi
    .getBeers()
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(err => res.send('error'));
});

app.get('/random-beer', (req, res, next) => {
  punkApi
    .getRandom()
    .then(randomBeer => {
      res.render('random-beer', { randomBeer });
    })
    .catch(err => res.send('error'));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
