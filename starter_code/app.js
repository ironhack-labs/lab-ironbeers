const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('views', __dirname + '/views/');
hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

  punkAPI.getBeers().then(beers => {
    //console.log(beers);
    res.render('beers', {
      beers
    });
  }).catch(error => {
    console.log(error);
  });
});

app.get('/random-beer', (req, res, next) => {

  const randomBeer = punkAPI.getRandom();

  randomBeer.then(beer => {
      //console.log(beer[0].name);
      res.render('random-beer', beer[0]);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random', (req, res, next) => {

  const random = punkAPI.getRandom();

  random.then(beer => {
      //console.log(beer[0].name);
      res.render('random', beer[0]);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);