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

app.get('/', (req, res, next) => res.render('index'));

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then((beersFromApi) => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { cerveza: beersFromApi });
    })
    .catch((error) => console.log(error));
});

app.get('/random-beers', (req, res, next) => {
  punkAPI
    .getRandom()
    .then((beersFromApi) => {
      console.log('Random Beer from the database: ', beersFromApi);
      res.render('random-beers', {cervezaR: beersFromApi });
    })
    .catch((error) => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
