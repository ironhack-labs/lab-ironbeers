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

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
      // res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res) => {
  console.log(req.params.id);
  punkAPI
    .getBeer(req.params.id.split('-')[1])
    .then(beerFromApi => {
      res.render('beer', beerFromApi[0]);

      console.log(beerFromApi[0]);
      // res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(aRandomBeer => {
      res.render('random-beer', aRandomBeer[0]);
    })
    .catch(error => console.log(error));
});

app.listen(3002, () => console.log('🏃‍ on port 3002'));
