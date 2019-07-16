
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers: beers});
  })
  .catch(error => {
    res.send("Server error. Sorry about that!\n" + JSON.stringify(error))
  })
});

app.get('/beers/:beerId', (req, res, next) => {
  punkAPI.getBeer(req.params.beerId)
  .then(beer => {
    res.render('beer', beer[0]);
  })
  .catch(error => {
    res.send("Server error. Sorry about that!\n" + JSON.stringify(error))
  })
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer => {
    res.render('beer', beer[0]);
  })
  .catch(error => {
    res.send("Server error. Sorry about that!\n" + JSON.stringify(error))
  })
});

app.listen(3000);
