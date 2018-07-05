
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res, next) => {
  res.render('index', {
    'activeHome': ' active'
  });
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {
        'beers': beers,
        'activeBeers': ' active'
      });
    })
    .catch(error => {
      console.log(error)
    });
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
    .then(beer => {
      res.render('randomBeer', {
        'beer': beer[0],
        'activeRandomBeers': ' active'
      });
    })
    .catch(error => {
      console.log(error)
    });
});


app.listen(3000);