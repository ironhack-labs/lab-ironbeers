const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
hbs.registerPartials(__dirname + '/views/partials');
const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      response.render('beers', {
        beerList: beersFromApi
      });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (request, response) => {
  const randomBeer = punkAPI
    .getRandom()
    .then(responseFromAPI => {
      const data = {
        randomizedBeer: randomBeer
      };
      response.render('random-beer', data);
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
