
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


///link with partials 
hbs.registerPartials(__dirname + "/views/partials");

app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers.hbs',{beers});
  })
  .catch(error => {
    console.log(error)
  })
  
});


punkAPI.getBeers()
  .then(beers => {

  })
  .catch(error => {
    console.log(error)
  })

app.get('/randomBeer', (req, res, next) => {
  res.render('randomBeer.hbs');
});


app.listen(3000);
console.log("beers");