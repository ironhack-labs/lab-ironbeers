const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => res.render('beers', { beers }))
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => res.render('random-beer', beer[0]))
    .catch(error => console.log(error));
});

hbs.registerHelper('if_even', function (conditional, options) {
  if (conditional % 2 == 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('if_odd', function (conditional, options) {
  if (conditional % 2 != 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
