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

//app.get('/beers', (req, res) => {
//  res.render('beers');
//});

app.get('/random-beer', async (req, res) => {
  let randomBeer = await punkAPI.getRandom();
  res.render('random-beer', randomBeer[0]);
});

/*
app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beersFromTheAPI => {
    res.render('beers', { beersFromTheAPI });
  });
});
*/ //OLD WAY 

app.get('/beers', async (req, res) => {
  let beersFromTheAPI = await punkAPI.getBeers();
  res.render('beers', {beersFromTheAPI});
});

app.listen(7500, () => console.log('🏃‍ on port 5000'));
