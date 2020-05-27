const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index.hbs');
})
app.get('/beers', function (req, res) {
punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log(beersFromApi);
    res.render('beers.hbs', {beersFromApi})
  })
  .catch(error => console.log(error));
})
app.get('/random-beer', function (req, res) {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('random-beer.hbs', {responseFromAPI})
  })
  .catch(error => console.log(error));
})

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
