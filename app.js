const { error } = require('console');
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
  const data = {
    imageFile: 'beer.png'
  };
  res.render('index', data);
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersArr => {
      // console.log(beersArr[0]);
      const beers = { beers: beersArr };
      res.render('beers', beers);
    })
    .catch(error => {
      console.log('There was an error', error);
    });
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      const beer = responseFromAPI[0];
      res.render('random-beer', beer);
    })

    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
