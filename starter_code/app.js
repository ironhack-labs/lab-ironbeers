
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', { beers } );
  })
  .catch(error => {
    console.log(error);
  })
});

app.get('/beers/:index', (req, res) => {
  let index = req.params.index;
  punkAPI.getBeers()
  .then(beers =>{
    let beer = beers[index];
    res.render('beer', beer);
  })
  .catch(error => {
    console.log(error);
  });
});

app.get('/random-beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    let n = Math.floor(Math.random() * beers.length );
    res.render('random-beers', beers[n] );
  })
  .catch(error => {
    console.log(error);
  })
});

app.listen(3000, () => {
  console.log( "Server listening on port 3000..." );
});