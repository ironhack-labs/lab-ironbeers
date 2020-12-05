const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index'); //page home
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);

      res.render('beers', { beersFromApi }); // on render que des objets
    })
    .catch(error => console.log(error));
  // res.render('beers');
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      res.render('random-beers', { randomBeer });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
