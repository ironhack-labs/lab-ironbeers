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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  let myData;

  punkAPI
    .getBeers()
    .then(beersFromApi => {
      myData = beersFromApi;
      res.render('beers', { myData });
    })
    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      const randomBeer = {};
      randomBeer.name = beer[0].name;
      randomBeer.image_url = beer[0].image_url;
      randomBeer.description = beer[0].description;
      randomBeer.tagline = beer[0].tagline;
      randomBeer.food_pairing = beer[0].food_pairing;
      randomBeer.brewers_tips = beer[0].brewers_tips;
      res.render('random-beers', randomBeer);
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
