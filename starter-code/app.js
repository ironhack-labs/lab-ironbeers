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
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/Beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi =>
      res.render('Beers', {
        allBeers: beersFromApi
      })
    )
    // .then(res.render('Beers', allBeers:beersFromApi))
    .catch(error => console.log(error));
});

app.get('/randombeers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI =>
      res.render('randombeers', {
        Beer: responseFromAPI
      })
    )
    .catch(error => console.log(error)); //res.render('randombeers'));
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));
