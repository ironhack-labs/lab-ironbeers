
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts);
app.set('layout', 'layout');

// app.get('/', (req, res, next) => {
//   res.render('index');
// });
app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then((beers) => {
      console.log(beers);
      res.render('beers', {
        beers,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});


app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
    .then((beer) => {
      console.log(beer);
      res.render('random-beers', {
        beer: beer[0],
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000);
