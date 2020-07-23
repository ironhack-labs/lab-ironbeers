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
  const beers = punkAPI.getBeers()
  
  beers.then(beersArr => {
    let newArr = beersArr
    res.render('beers', {newArr}) })
  .catch(error => console.log(error));
  
});

app.get('/random-beers', (req, res) => {
  const beer = punkAPI.getRandom()
  
  beer.then(resApi => {
    let randoBeer = resApi
    res.render('random-beers', {randoBeer}) })
  .catch(error => console.log(error));
});

app.listen(3002, () => console.log('🏃‍ on port 3000'));


