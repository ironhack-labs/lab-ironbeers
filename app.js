const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  let results = [];
  punkAPI
  .getBeers()
  .then((beers) => {
    return results = beers;
  })
  .then((beers) => {
    if (req.query.search) {
      beers = beers.filter(beer => beer.name.toLocaleLowerCase().includes(req.query.search))
    }
    if (beers.length == 0) {
      res.render('error')
    }
    res.render('beers', { beers } );
  })
});

app.get('/random-beers', (req, res) => {
  let result = [];
  punkAPI
  .getRandom()
  .then((beer) => {
    return result = beer;
  })
  .then((beer) => {
    res.render('random-beers', { beer } );
  })
});

app.get('/beers/beer-:id?', (req, res) => {
  let result = [];
  punkAPI
  .getBeer(req.params.id)
  .then((beer) => {
    return result = beer;
  })
  .then((beer) => {
    res.render('random-beers', { beer } );
  })
});

app.use((req, res, next) => {
  res.render('error');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
