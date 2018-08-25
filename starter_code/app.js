
const express = require('express');
const hbs     = require('hbs');
const app     = express();

const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index.hbs');
});

app.get('/index', (req, res, next) => {
  res.render('index.hbs');
});

hbs.registerPartials(__dirname + '/views/partials')

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
   let data = {
     beerlist: beers
   }
    res.render("beers", data);
    
  })
  .catch(error => {
    console.log(error)
  })
});



app.get('/randomBeers', (req, res, next) => {
  punkAPI.getRandom()
  .then(info => {
    let data = {
      beerRandom: info
    }
     res.render("randombeer.hbs", data);
  })
  .catch(error => {
    console.log(error)
  })
});

app.listen(3000);