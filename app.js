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

hbs.registerHelper('trimString', (passedString, trim = false) => {
  if (!trim || passedString.length <= 150) return passedString;
  const trimmedString = passedString.substring(0, 150);
  return new hbs.SafeString(`${trimmedString}...`);
});

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(([randomBeerFromApi]) => {
      res.render('beer-detail', randomBeerFromApi);
    })
    .catch(error => console.log(error));
});

app.get('/beers/:beerID', (req, res) => {
  punkAPI.getBeer(req.params.beerID).then(([selectedBeer]) => {
    res.render('beer-detail', selectedBeer);
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
