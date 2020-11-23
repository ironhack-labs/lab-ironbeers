const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

// punkAPI
//   .getBeers()
//   .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
//   .catch(error => console.log(error));

app.get('/beers', (req, res) => {
  const beerList = punkAPI.getBeers()
  res.render('beers', {beerList});
});

app.get('/random-beers', (req, res) => {
  const beerRandom = punkAPI.getRandom()
  res.render('random-beers', {beerRandom});
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
