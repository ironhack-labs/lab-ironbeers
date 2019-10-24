
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/home', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const allBeers = punkAPI.getBeers();
  allBeers.then(beers => {
    console.log(beers);
    res.render('beers', {beers});
  });
});

app.get('/randombeers', (req, res, next) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer.then(beer => {
    console.log(beer);

    res.render('random-beers', beer[0]);

  });

});

  app.listen(3000);