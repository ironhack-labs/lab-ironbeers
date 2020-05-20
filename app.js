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

hbs.registerPartials(path.join(__dirname, '/views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { beers: beersFromApi }));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      console.log(JSON.stringify(beersFromApi));
      res.render('random-beer', beersFromApi[0]);
    })
    .catch(console.log(`We don't have a random beer`));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
