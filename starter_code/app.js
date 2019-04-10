
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

console.log(__dirname);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('./public'));
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res, next) => {
  res.render('partials/index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('partials/beers', {beers} );
  })
  .catch(error => {
    console.log(error)
  })  
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer => {
    res.render('partials/random-beer', {beer} );
  })
  .catch(error => {
    console.log(error)
  })  
});

app.listen(3000);
