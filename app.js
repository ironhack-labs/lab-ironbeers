const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
const beersAPI = punkAPI.getBeers()
const randomBeer = punkAPI.getRandom()

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
    beersAPI
      .then(beersFromApi => res.render('beers', { data: beersFromApi }))
      .catch(error => console.log(error));
});
app.get('/random-beer', (req, res) => {

randomBeer.then(beer =>{ res.render('randombeer', { data: beer[0]})
console.log(beer[0])})
  .catch(error => console.log(error));
});

app.listen(4000, () => console.log('🏃‍ on port 4000'));

punkAPI
.getRandom()
  .then(responseFromAPI => {
    // your magic happens here
  })
  .catch(error => console.log(error));