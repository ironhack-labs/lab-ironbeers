const express = require('express');
const hbs = require('hbs');
const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// Route index.hbs
app.get('/', (req, res) => {
  res.render('index');
});

// Route beers.hbs
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
      console.log('Beers from the database: ', beersFromApi);
    })
    .catch(error => console.log(error));
});

// Route randombeer.hbs
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('randombeer', { randombeer: responseFromAPI });
      console.log('Random beer from the database: ', responseFromAPI);
    })
    .catch(error => console.log(error));
});

app.listen(4001, () => console.log('🏃‍ on port 4001'));
