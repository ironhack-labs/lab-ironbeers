const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
const getBeers = punkAPI.getBeers();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((apiRes) => {
      res.render('beers', {
        beers: apiRes,
      });
    })
    .catch((err) => console.log(err));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then((apiRes) => {
      res.render('random-beer', {
        beer: apiRes[0],
      });
    })
    .catch((err) => console.log(err));
});

app.get('/beers/:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then((apiRes) => {
      res.render('beerDetail', {
        beer: apiRes[0],
      });
    })
    .catch((err) => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port http://localhost:3000'));
