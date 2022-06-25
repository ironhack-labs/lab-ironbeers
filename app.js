const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/beers', function(req, res) {
  punkAPI
  .getBeers()
  .then(function(beersFromApi) {
    res.render('beers', {beerList: beersFromApi})
    console.log('Beers from the database: ', beersFromApi)}
  )
  .catch(error => console.log(error));
})

app.get('/random-beer', function(req, res) {
  punkAPI
  .getRandom()
  .then(function(responseFromApi) {
    res.render('random-beer', { randomBeer: responseFromApi[0] })
  })
  .catch(error => console.log(error));
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
