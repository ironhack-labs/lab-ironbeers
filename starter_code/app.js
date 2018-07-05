//express
const express = require('express');
const app     = express();
//mongoose
const mongoose = require('mongoose');
//sistema de templates handlebars (hbs)
const hbs     = require('hbs');
//configuramos hbs
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const path    = require('path');

//this will be acting as my database??
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('randomBeer', {beers});
  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(3000, () => {
  console.log('hola');
});