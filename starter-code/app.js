const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

hbs.registerPartials(__dirname + '/views/partials');

// add the routes here:
app.get('/', (request, response) => {
  response.render('index');
});

app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(beerslist => {
      console.log(beerslist);
      response.render('beers', { beerslist });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (request, response) => {
  punkAPI
    .getRandom()
    .then(beersList => {
      console.log('RANDOM BEER', beersList);
      response.render('random-beer', { beersList });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
