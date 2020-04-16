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
hbs.registerPartials(__dirname + '/views/partials');

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) =>
  punkAPI
    .getBeers()
    .then((beersFromApi) => {
      res.render('beers', { beers: beersFromApi });
    })
    .catch((error) => console.log(error))
);

app.get('/random-beer', (req, res) =>
  punkAPI
    .getRandom()
    .then((randomBeer) => {
      res.render('random-beer', { beer: randomBeer[0] });
    })
    .catch((error) => console.log(error))
);

app.get('/beers/:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then((beer) => {
      res.render('beer-details', { beer: beer[0] });
      console.log(beer[0]);
    })
    .catch((error) => console.log(error));
});

app.listen(3000);
