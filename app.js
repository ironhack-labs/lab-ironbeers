const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('home');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beerData => {
      res.render('beers', beerData);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random', (req, res, send) => {
  punkAPI
    .getRandom()
    .then(beerData => {
      console.log(beerData)
      res.render('random', beerData[0]);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log('***Application started***');
});
