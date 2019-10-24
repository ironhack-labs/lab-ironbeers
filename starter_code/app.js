
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


hbs.registerPartials(__dirname + '/partials');
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {data: beers});
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer => {
    console.log(beer[0])
    res.render('random', {data: beer[0]});
  })
  .catch(error => {
    console.log(error)
  })
});



app.listen(3000);
