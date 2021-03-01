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
hbs.registerPartials(__dirname + '/views/partials');

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    // .then((beersDocument)=>console.log(beersDocument))
    .then(beersDocument => res.render('beers', { beers: beersDocument }))
    .catch(next);
});

app.get('/random-beers', (req, res, next) => {
  punkAPI
    .getRandom()
    // .then((beerDocument)=>console.log(beerDocument))
    .then(beerDocument => res.render('random-beers', { beer: beerDocument[0] }))
    .catch(next);
});

app.get('/beers/beer-:id', (req, res, next) => {
  punkAPI
    .getBeer(req.params.id)
    // .then((beerDocument)=>console.log(beerDocument))
    .then(beerDocument => res.render('random-beers', { beer: beerDocument[0] }))
    .catch(next);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
