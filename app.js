const express = require('express');

// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const path = require('path');
// https://www.npmjs.com/package/punkapi-javascript-wrapper
// https://punkapi.com/documentation/v2
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers(getRandomBeerOption())
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log('Random beer: ', randomBeer);
      res.render('random-beer', randomBeer[0]);
    })
    .catch(error => console.log(error));
});

app.get('/beers/beer-:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then(randomBeer => {
      res.render('beer', randomBeer[0]);
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

function getRandomBeerOption() {
  const options = [
    { abv_gt: 8 },
    { abv_gt: 6 },
    null,
    { abv_lt: 8 },
    { hops: 'Ahtanum' }
  ];
  return options[Math.floor(Math.random() * options.length)];
}
