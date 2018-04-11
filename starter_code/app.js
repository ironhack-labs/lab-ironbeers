
const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      console.log(beers[0].name);
      res.render('beers', {beers});
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/randombeers', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      const beer = beers[0];
      res.render('randombeers', {beer});
    })  
    .catch(error => {
      console.log(error);
    });  
});

app.listen(3000);