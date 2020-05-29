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

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
    res.render('beers',{beers});
  });
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeerReturned => {
    res.render('random-beer',randomBeerReturned[0]);
  })
});

app.get('/beer:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then(beerReturned => {
    res.render('beer',beerReturned[0]);
  })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
