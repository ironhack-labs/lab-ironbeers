const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/', (req, res, next) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { beersFromApi }))

    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => res.render('random-beer', { responseFromAPI }))

    .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res) => {
  punkAPI
    .getBeers({ ids: req.params.id })
    .then(selectBeer =>
      res.render('random-beer', { responseFromAPI: selectBeer })
    )

    .catch(error => console.log(error));
});

// app.get('/beerCard', (req, res, next) => res.render('beers'));
//app.get('/beerCardRandom', (req, res, next) => res.render('random-beer'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
