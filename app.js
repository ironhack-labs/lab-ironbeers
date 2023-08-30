const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

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
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/beers', (req, res) => {
  const beerId = req.params.beerId; //get the beerId parameters from URL & store it

  punktAPI
    .getBeers(beerId)
    .then(beer => {
      res.render('beers', { beer: beer[0] }); // first value of beer array // data structure: [{}, {},...] (object: key-value)
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomFromAPI => {
      res.render('randombeers', { randombeers: randomFromAPI });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
