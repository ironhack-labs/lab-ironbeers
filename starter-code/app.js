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
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (request, response) => {
  response.render('index');
});

app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // console.log('Beers from the database: ', beersFromApi);
      response.render('beers.hbs', { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      // console.log('Beers from the database: ', beersFromApi);
      res.render('random-beer.hbs', { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.listen(3000);
