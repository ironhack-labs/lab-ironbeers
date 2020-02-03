const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, "views/partials"));

app.use(express.static(path.join(__dirname, 'public')));

// Home
app.get('/', (req, res) => res.render('index'));

// Beers
app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beers => {
    res.render('beers', {beers})
  })
  .catch(error => console.log(error));
});

// Specific beer
app.get('/beers/:beer_id', (req, res) => {
  punkAPI
  .getBeer(req.params.beer_id)
  .then(beers => {
    res.render('specific-beer', {beers})
  })
  .catch(error => console.log(error));
});


// Random beer
app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(beers => {
    res.render('specific-beer', {beers})
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
