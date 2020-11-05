const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beersFromApi =>
    res.render('beers', {
      beersFromApi
    })
  ).catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom().then(randomBeer =>
    res.render('random-beer', {
      randomBeer
    })
  ).catch(error => console.log(error))
});

app.get(`/beers/beer-:id`, function (req, res) {
  punkAPI.getBeer((req.params).id).then(beerID => res.render(`beer-by-id`, {
    beerID
  })).catch(error => error)
});

app.listen(3000);

module.exports = app;