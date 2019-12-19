const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  res.render('index');
});

// how to call the function to see whats inside the Premise
// punkAPI.getBeers().then(beers => console.log(beers));

app.get('/beers', (req, res, next) => {
  punkAPI
  .getBeers()
  .then(beers => {
    const data = {
      beers: beers,
    }
    res.render('beers', data);
  })
  .catch(error => {
    console.log(error);
  });
});

// how to call the function to see whats inside the Premise
punkAPI.getRandom().then(beers => console.log(beers[0]));

app.get('/random-beer', (req, res, next) => {
  punkAPI
  .getRandom()
  .then(beers => {
    const data = {
      beers: beers[0],
    }
    res.render('randomBeer', data);
  })
  .catch(error => {
    console.log(error);
  });
});


app.listen(3000);
