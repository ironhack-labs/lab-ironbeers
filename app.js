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

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beersFromApi => {
      console.log('beers from api', beersFromApi)
      res.render('beers', { beersFromApi });
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).send('sorry a server error has occured');
    })


});

app.get('/layout', (req, res, next) => {
  res.render('layout');
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
    .then(randomBeerFromApi => {
      console.log(randomBeerFromApi)
      res.render('random-beer', { randomBeerFromApi: randomBeerFromApi[0] })
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).send('sorry a server error has occured');
    })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
