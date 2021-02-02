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

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const beerList = {
        beers: beersFromApi
      };
      res.render(`beers`, beerList);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromApi => {
      const randomB = {
        random: responseFromApi
      };

      res.render(`random-beers`, randomB);
    })

    .catch(error => {
      console.log(error);
    });
});

app.get('beers/beer-:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then((beerFromApi) => {
      const selectedBeer = {
        beer: beerFromApi
      };
      res.render(`selected`, selectedBeer);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(4000, () => console.log('🏃‍ on port 4000'));
