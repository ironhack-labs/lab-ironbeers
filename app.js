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

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beersFromApi => res.render('beers', { beers: beersFromApi }))
    .catch(err => console.log(err.message));
});

// app.get('/beers', async (req, res) => {
//   const beers = await punkAPI.getBeers();
//   res.render('beers', { beers });
// });

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
    .then((randomBeerFromApi) => res.render('random-beer', { randomBeer: randomBeerFromApi }))
    .catch(err => alert(err.message));  
});

app.get('/beers/:id', (req, res) => {
  punkAPI.getBeer(parseInt(req.params.id))
    .then((beer) => res.render('beer', { beer }))
    .catch(err => alert(err.message));  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
