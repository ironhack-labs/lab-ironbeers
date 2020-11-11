const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.render('index');
});

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log(beersFromApi);
      response.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/beers/:id', (request, response) => {
  punkAPI
    .getBeer()
    .then(idFromAPI => {
      response.render('beers', { beerId: idFromAPI });
    })
    .catch(error => console.log(error));
});

app.get('/random-beers', (request, response) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log(responseFromAPI);
      response.render('random-beers', { rBeers: responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
