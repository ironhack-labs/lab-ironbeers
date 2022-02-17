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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {beers: beers});
    })
    .catch(e => console.log(e));
});

app.get('/beers/beer/:id', (req, res) => {
  punkAPI.getBeer(req.params.id)
    .then(beer => {
      res.render('beers', {beers: beer});
    })
})

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom()
    randomBeer
      .then(beer => { 
        res.render('randomBeer', beer[0]);
      })
      .catch(e => console.log(e));
});

app.listen(7000, () => console.log('🏃‍ on port 7500'));
