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

// ...

// Add the route handlers here:

// route to the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// route to the beers
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    res.render('beers', { beersFromApi });
  })
  .catch(error => console.log(error));
});

// route to the random beer
app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(randomBeer => {
    console.log('Random beer from the database: ', randomBeer)
    
    res.render('randomBeer', {randomBeer});
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
