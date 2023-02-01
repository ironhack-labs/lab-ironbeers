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
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:
app.get('/', (req, res) => {
  const image = '/images/beer.png';
  res.render('index', { image: image });
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beerList : beersFromApi, extended : false });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      res.render('random-beer', { randomBeer : beer[0] , extended : true});
    })
    .catch(error => console.log(error));
});

app.get('/beers/beer-:beerId', (req, res) => {
  punkAPI
  .getBeer(req.params.beerId)
  .then(beer => {
    res.send('beer', { selectBeer : beer[0] , extended : true});
  })
})

app.listen(5000, () => console.log('🏃‍ on port 5000'));
