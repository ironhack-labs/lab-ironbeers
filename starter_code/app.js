
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000;

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then((beers) => {
      res.render('beers', { beers });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/random-beers', (req, res, next) => {
  res.render('random-beers');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
