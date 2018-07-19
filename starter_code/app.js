
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  const beer_image = '/images/beer.png'
  const beers = '/beers';
  const random_beers = '/random-beers';
  res.render('index', {beer_image, beers, random_beers});
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      console.log(beers);
      res.render('beers', {beers});
    })
    .catch(error => {
      console.log(error)
    })
});

app.listen(3000);