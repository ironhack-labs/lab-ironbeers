const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
hbs.registerPartials(__dirname + '/views/partials');


const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
  .getBeers()
  .then(beers => {
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error);
  });
});

app.get('/random-beers', (req, res, next) => {
  res.render('randombeers');
});

app.listen(3000, () => console.log('Listones!!!'));
