const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers');
      console.log(beers)
    })
    .catch(err => console.error(err));
});

app.get('/random-beer', (req, res) => {
  fetch('https://punkapi-javascript-wrapper-demo.glitch.me/beer/random')
  .then((response) => response.json())
  res.render('random-beer');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
