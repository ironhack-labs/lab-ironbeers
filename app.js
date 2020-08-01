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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {active: { home: true }});
});

app.get('/beers', (req, res) => {
  
  // punkAPI
  // .getBeers()
  // .then(beersFromApi => console.log(beersFromApi))
  // .catch(error => console.log(error)); 
  punkAPI
  .getBeers()
  .then(beersFromApi => res.render('beers', {beersFromApi, active: { beers: true }}))
  .catch(error => console.log(error));  
});

app.get('/random-beers', (req, res) => {

  // punkAPI
  // .getRandom()
  // .then(beer => console.log(typeof beer))
  // .catch(error => console.log(error));  

  punkAPI
  .getRandom()
  .then(beer => res.render('random-beer', {beer, active: { random: true }}))
  .catch(error => console.log(error));  



});

app.listen(3000, () => console.log('Running... on port 3000'));
