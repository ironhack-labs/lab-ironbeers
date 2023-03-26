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
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const allBeer = punkAPI.getBeers();
  allBeer.then((beersFromApi) => {
    console.log('Beers from the database: ', beersFromApi);
    let beerData = {beers: beersFromApi};
    res.render('beers', beerData);
  })
    .catch((err) => console.log("there was an error", err));
});

app.get('/random-beer', (req, res, next) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer.then((beersFromApi) => {
    console.log('Random beer ', beersFromApi);
    let randomBeerData = {randomBeer: beersFromApi};
    res.render('random-beer', randomBeerData);
  })
    .catch((err) => console.log("there was an error", err));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
