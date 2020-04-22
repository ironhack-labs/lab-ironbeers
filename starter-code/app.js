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

// add the routes here:

//  --- iteration 1 ---
app.get('/', (req, res) => res.render('index'));


// --- iteration 3.1 ---
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()

    .then((beersFromApi) => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', {
        beerlist: beersFromApi,
      });
    })
    .catch((error) => console.log(error));
});


// --- iteration 4.1 ---
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()

    .then((beersFromApi2) => {
      console.log('Beers from the database: ', beersFromApi2);
      res.render('random-beer', {
        randomlist: beersFromApi2,
      });
    })
    .catch((error) => console.log(error));
});


// --- server ---
app.listen(3000, () => console.log('🏃‍ on port 3000'));
