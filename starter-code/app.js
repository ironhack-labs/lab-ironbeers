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
//hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index.hbs'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      //console.log(beersFromApi));
      res.render('beers', { beersList: beersFromApi });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromApi => {
      //console.log(beersFromApi));
      res.render('randomBeers', { randomList: responseFromApi });
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
