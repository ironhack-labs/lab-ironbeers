const express = require('express');

const hbs = require('hbs');
const { get } = require('http');
const path = require('path');
const { send } = require('process');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials")

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { beers: beersFromApi }))
    .catch(error => console.log(error))
})

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeerFromApi => {
      console.log(...randomBeerFromApi)
      res.render('random-beer', ...randomBeerFromApi )
    })
    .catch(error => console.log(error))
})

app.get('/beers', (req, res) => {
  let beer = req.query.beer
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
