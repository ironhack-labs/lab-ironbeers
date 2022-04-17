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
  res.render('index.hbs');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beersFromApi });
    })

    .catch(error => {
      console.log(error);
      res.status(500).send('sorry a server error occured');
    });
});
app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      // console.log('Beers from the database: ', beersFromApi);
      res.render('random-beer', { randomBeer: randomBeer[0] });
    })

    .catch(error => {
      console.log(error);
      res.status(500).send('sorry a server error occured');
    });
});

app.get('/random-beer', (req, res, next) => res.render('random-beer'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
