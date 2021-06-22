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

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beers => {
    res.render('beers', {
      beers: beers
    });
  });
});





// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beersFromTheAPI => {
    res.render('beers', { beersFromTheAPI });
  });
});

app.get('/random-beer', async (req, res) => {
let randomBeer = await punkAPI.getRandom();
  res.render('random', randomBeer[0]);
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
