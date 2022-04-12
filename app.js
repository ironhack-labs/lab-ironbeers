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
hbs.registerPartials(path.join(__dirname, "views", "partials"));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { theBeers: beersFromApi }))
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => res.render('randomBeer', { randomBeer: beersFromApi }))
    .catch(error => console.log(error));
});

app.get('/beer/:id', (req, res) => {
  let beerID = req.params.id
  punkAPI
    .getBeer(beerID)
    .then(beersFromApi => res.render('beer', { oneBeer: beersFromApi }))
    .catch(error => console.log(error));

});

app.listen(3000, () => console.log('running on port 3000'));
