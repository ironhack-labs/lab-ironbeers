const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', (req, res) => {
  res.render('index');
}) 

app.get('/', (req, res) => {
  res.redirect('/home');
}) 

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {
        beers: beers
      })
    })
}) 

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(randomBeers => {
      res.render('randomBeers', {
        randomBeers: randomBeers
      })
    })
}) 

app.listen(3000, () => console.log('🏃‍ on port 3000'));


