
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const beers = punkAPI.getBeers();
  beers.then(beersArr => {
    res.render('beers', { beersArr })
  }).catch(error => {
    console.log(error)
  })
});

app.get('/randomBeer', (req, res, next) => {
  const randomBeer = punkAPI.getRandom()
  randomBeer.then(beer => {
    res.render('randomBeer', ...beer);
  })
  .catch(error => {
    console.log(error)
  })
});

app.listen(3000, () => console.log("server started!"));
