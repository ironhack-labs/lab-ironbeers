const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));

//Roots_________________________________________________________________

app.get('/', (req, res) => {
  res.render('index', {h1: 'hola'});
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then((beersFromApi) => {
    console.log(beersFromApi);
    res.render('beers', {beers: beersFromApi})
  })
  .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log(responseFromAPI);
    res.render('random-beer', {randomBeer: responseFromAPI[0]});
  })
  .catch(error => console.log(error));

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
