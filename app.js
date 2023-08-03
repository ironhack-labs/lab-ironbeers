const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
// Register the partials directory

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred while fetching beers.');
    });
    
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      const randomValue = Math.random(); // Generate a random value for cache-busting
      const beer = responseFromAPI[0]; // Assuming the response is an array

      res.render('random-beer', { beer, randomValue });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred while fetching random beer.');
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
