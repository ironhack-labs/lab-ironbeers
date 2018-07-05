const express = require('express');
const app     = express();

const hbs     = require('hbs');

const path    = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials')

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers',{beers});
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('randomBeer',{beers});
  })
  .catch(error => {
    console.log(error)
  })
});

app.listen(3000,()=> {
  console.log("Me conecté a la BD 3000")
});