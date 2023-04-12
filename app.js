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

// Iteration 2

// Add the route handlers here:

app.get('/', (req, res) => {
const imageBeer = "/images/beer.png"

  res.render('index', {imageBeer});

});

app.get('/beers', (req, res) => {
  res.render('Beers');
});

app.get('/beer-random', (req, res) => {
  res.render('Beer-Random');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
