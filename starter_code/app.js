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

// /Routes:
//Home page
app.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});
//beers page
app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      // console.log( beers.length);
      res.render('beers', {
        title: 'Beers',
        myStyle: '/stylesheets/beers.css',
        beers,
        len: false
      });
    })
    .catch(error => console.log(error));
});
//beers/beer-id page
app.get('/beers/:id', (req, res, next) => {
  // console.log(req.params.id);
  punkAPI
    .getBeers()
    .then(beers => {
      const beer = beers.filter(beer => `beer-${beer.id}` === req.params.id);
      res.render('randomBeer', {
        title: req.url.substr(7),
        myStyle: '/stylesheets/randomBeer.css',
        beer,
        len: true
        // layout: false
      });
      // console.log( beer);
      // res.json(beer);
    })
    .catch(error => console.log(error));
});
//random-beer page
app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beer => {
      res.render('randomBeer', {
        title: 'Random Beer',
        myStyle: 'stylesheets/randomBeer.css',
        beer,
        len: true
      });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log(`Server running`));
