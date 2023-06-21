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

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  // Call the getBeers() method of the PunkAPIWrapper
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: 'Error fetching beers' });
    });
});

app.get('/random-beer', (req, res) => {
  // Call the getRandom() method of the PunkAPIWrapper
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log(responseFromAPI);
      res.render('random-beer', { beer: responseFromAPI[0] });
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: 'Error fetching random beer' });
    });
});

const port = 3001;
app.listen(port, () => console.log('🏃‍ on port ',port));
