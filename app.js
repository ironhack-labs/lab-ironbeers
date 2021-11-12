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
hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beerList: beersFromApi, doctitle: 'Beers Page' });
    })
    .catch(err => console.log(err));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beers => {
      res.render('random-beer', { randomBeer: beers, doctitle: 'Random Beer' })
    })
})

app.get('/beers/:id', (req, res) => {
  const id = req.params.id
  punkAPI
  .getBeer(id)
  .then(beer => {
    res.render('beer-details', { beer, doctitle: 'Beer Details' });
  })
  .catch(err => console.log(err));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
