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

const handlebars = require('hbs');
handlebars.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI

  .getBeers()
  .then (beersFromApi => {
   console.log('Beers from the database: ', beersFromApi)
   res.render('beers',{allTheBeers: beersFromApi})

    })
  .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI

  .getRandom()
  .then (beersFromApi => {
   console.log('Random Beer from the database: ', beersFromApi)
   res.render('random-beer',{randomBeer: beersFromApi})

    })
  .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  res.render('random-beer');
});

app.listen(5000, () => console.log('🏃‍ on port 5000'));
