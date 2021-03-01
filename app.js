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

app.get('/', (req, res) => {
  res.render('index');
});

//iteration 3
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then((beersFromApi) => {
    res.render("beers", { beers: beersFromApi})
  })
  .catch(next)
})

//iteration 4
app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then((randomBeerFromApi) => {
    res.render("random-beers", { randomBeer: randomBeerFromApi[0]})
  })
  .catch(next)
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
