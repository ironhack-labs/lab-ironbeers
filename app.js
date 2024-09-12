const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Functions

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render(__dirname + '/views/index.hbs');
});

app.get('/beers', async (req, res) => {
  try {
    const response = await punkAPI.getBeers();
    res.render('beers', response);
  } catch (error) {
    console.log(error);
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const response = await punkAPI.getRandom();
    console.log('random beer requested', response);
    res.render('random-beer', response[0]);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
