const express = require('express');
const { registerPartial } = require('hbs');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then((beers) => res.render("beers", {beers}))
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then((randomBeer) => {
    const beer = randomBeer[0];
    res.render("randombeer", {
      beer: beer
    })
  })
  .catch((err) => next(err));
});

app.get('/beers/beer-:id', (req, res, next) => {
  punkAPI.getBeer(req.params.id)
  .then((beer) => {
    const oneBeer = beer[0];
    res.render("onebeer", {oneBeer})
  })
  .catch((err) => next(err))
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
