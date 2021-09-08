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
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  const arrBeers = punkAPI.getBeers(); // -> it's a promise
  // punkAPI
  //   .getBeers()
  /*arrBeers
.then(beersFromApi => {}
 console.log('Beers from the database: ', beersFromApi));       
res.render('beers', { allBeers: arrBeers });
.catch(error => console.log(error));*/

  arrBeers
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { allBeers: beersFromApi });
    })
    .catch(err => {
      console.error(err);
    });
});

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom();

  randomBeer
    .then(beer => {
      console.log('Random Beer: ', randomBeer);
      res.render('random-beer', { beer });
    })
    .catch(err => {
      console.error(err);
    });
});
// ...

// Add the route handlers here:
app.listen(3000, () => console.log('🏃‍ on port 3000'));
