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

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    console.log("Beers from the API:", beersFromApi)
    res.render('beers', { beersFromApi })
  })
  .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  let rng = Math.floor(Math.random() * (24 - 0 + 1) + 0)
/*   let rng = Math.floor(Math.random() * (max - min + 1) + min) */
  punkAPI.getBeers()
  .then(beersFromApi => {
    randomBeer = beersFromApi[rng]
    res.render('random-beer', randomBeer)
  })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
