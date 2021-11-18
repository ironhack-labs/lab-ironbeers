const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
hbs.registerPartials(path.join(__dirname, 'views/partials'));
const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
//home
app.get('/', (req, res) => {
  res.render('index');
});

//beers
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi =>
      res.render('beers', {
        beersFromApi: beersFromApi
      })
    )
    .catch(error => console.log(error));
});

//random-beer
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI =>
      res.render('random-beer', {
        responseFromAPI: responseFromAPI
      })
    )
    .catch(error => console.log(error));
});

app.listen(3005, () => console.log('🏃‍ on port 3005'));
