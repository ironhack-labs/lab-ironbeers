const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
app.use(express.static("public"));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Add the route handlers here:

app.get('/', (req, res, next) => {
  const filePath = path.join(__dirname, "views", "index.html");
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const beerArr = punkAPI.getBeers();
  beerArr
  .then(beerArr => {
    res.render('beers', {beerArr});
  })  
});

app.get('/random-beer', (req, res, next) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer
  .then(randomBeer => {
    res.render('random-beer', {randomBeer});
  })  
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));


