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

app.get('/', (req, res) => res.render('index'));

app.get('/beer/:id', (req, res) => {
  console.log(req.params)
  const id = req.params.id;
  punkAPI
  .getBeer(id)
  .then(singleBeer => res.render('singleBeer', singleBeer[0]));
});

app.get('/beers', (req, res) => {
 punkAPI
  .getBeers()
  .then(beersFromAPI => res.render('beers', { beersFromAPI }))
  .catch(error => console.log('error', error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(randomBeerFromAPI => res.render('randomBeer', randomBeerFromAPI[0]))
  .catch(error => console.log('error', error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
