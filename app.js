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
  const beerImage = '/images/beer.png';
  res.render('index', { beerImage });
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // Pass the beers array to the beers.hbs view
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => {
      console.log(error);

      res.send('Error retrieving beers');
    });
});
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beer', { beer: responseFromAPI[0] });
    })
    .catch(error => {
      console.log(error);

      res.send('Error retrieving random beer');
    });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
