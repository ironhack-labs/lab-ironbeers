
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.set('stylesheets', __dirname + '/stylesheets');
app.use(express.static(path.join(__dirname, 'public')));

//const btnBeer = document.getElementById('btn-beer');
//button.addEventListener('click', res.render('beers'));


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {res.render('beers',{beers});
  })
  .catch(error => {
    console.log(error)
  })
  
});

app.get('/randomBeer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    console.log(beers);
    res.render('random',{beers});

  })
  .catch(error => {
    console.log(error)
  })
  
});


app.listen(3000);
