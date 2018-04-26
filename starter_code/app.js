
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

const photobeer = {ruta: 'images/beer.png'};

app.get('/', (req, res, next) => {
  const ctx = {
    photobeer,
    title: 'Home'
  };
  res.render('index', ctx);
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers});
    console.log(beers);
  })
  .catch(error => {
    console.log(error);
  })

});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    console.log(beers);
    res.render('random-beers', {beer: beers[0]});
  })
  .catch(error => {
    console.log(error)
  })

});


app.listen(3000, err => console.log("Listolas..."));