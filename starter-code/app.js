const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index.hbs'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((apiRes) => {
      res.render('beers.hbs', {
        beers: apiRes,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then((apiRes) => {
      res.render('random-beers.hbs', {
        beer: apiRes[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/one-beer/:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then((apiRes) => {
      res.render('one-beer.hbs', {
        beer: apiRes[0],
      });
    })
    .catch((apiErr) => {
      console.log(apiErr);
    });
});

// app.get('/random-beers', (req, res) => res.render('random-beers.hbs'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
