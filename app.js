const express = require('express');
const { redirect } = require('express/lib/response');

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
  punkAPI.getBeers()
  .then((beersFromAPI) => {
    res.render('beers', {beersArr: beersFromAPI});
    console.log(beersFromAPI);
  })
  .catch()
})

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then((randomFromAPI) => {
    res.render('random-beer', {randomObj: randomFromAPI});
    console.log(randomFromAPI);
  })
  .catch()
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
