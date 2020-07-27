const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { response } = require('express');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// Add the route handlers here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Iteration 2_route endpoint home
app.get('/', (req, res) => {
  res.render('index.hbs');
});

//Iteration 3.1_route endpoint beers

app.get('/beers', function (req, res) {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log(beersFromApi);
      res.render('beers.hbs', {beersFromApi})
    })
    .catch(error => console.log(error));
  })

//Iteration 4.1_route-random-beer
app.get('/random-beer', function (req, res) {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log(responseFromAPI);
      res.render('random-beer.hbs', { responseFromAPI });
    })
    .catch(error => console.log(error));
});
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
