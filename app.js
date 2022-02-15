const express = require('express');
const logger = require('morgan');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials');


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { theBeers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/randomBeer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromApi => {
      res.render('randomBeer', { randomBeer: responseFromApi });
    })
    .catch(error => console.log(error));
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
