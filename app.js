const express = require('express');
const app = express();
const path = require('path');

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartial('beerPartial', '{{beerPartial}}');
hbs.registerPartial('randomBeerPartial', '{{randomBeerPartial}}');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const PunkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('partials', path.join(__dirname, '/views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  PunkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', beersFromApi);  
    })
    .catch(error => console.log(error));
});


app.get('/random-beers', (req, res) => {
  PunkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('random-beers', responseFromAPI[0]);
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
