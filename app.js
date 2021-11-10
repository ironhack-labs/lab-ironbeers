const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// VIEW ENGINE
app.set('view engine', 'hbs');

// SETUP FOLDER WITH TEMPLATES
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beer: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.use('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log('responseFromAPI :>> ', responseFromAPI);
      res.render('random-beer', { beer: responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
