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

app.get('/beers', (req, res) => {
  console.log('Beers is working')

  punkAPI
    .getBeers()
    .then(beersFromApi =>
      res.render('beers', { beerList: beersFromApi })
    )
    .catch(error => console.log(error));

})

app.get('/randombeer', (req, res) => {

  punkAPI
    .getRandom()
    .then(responseFromAPI =>
      res.render('randombeer', { randomBeer: responseFromAPI })
    )
    .catch(error => console.log(error));

})

app.listen(5005, () => console.log('🏃‍ on port 5005'));
