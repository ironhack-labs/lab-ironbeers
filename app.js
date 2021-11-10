const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs'); //enging for hbs
app.set('views', path.join(__dirname, 'views')); //path for views folder

app.use(express.static(path.join(__dirname, 'public'))); //path for static files in public

app.all('/', (request, response) => {
  //index path
  response.render('index.hbs');
});

app.all('/beers', (request, response) => {
  //beers path
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      response.render('beers.hbs', { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.all('/random-beer', (request, response) => {
  //random beers path
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      response.render('random-beer.hbs', { responseFromAPI });
    })
    .catch(error => console.log(error));
});

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
