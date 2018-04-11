
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
// Registering Partial
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(path.join(__dirname, 'public')));



// Rendering index
app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (req, res, next) => {
  // Getting beers and then calling render

  punkAPI.getBeers()
  .then(beers => {
    let myBeerList = {beers:beers};
    res.render('beers',myBeerList);
  })
  .catch(error => {
    console.log(error)
  })

 
  
});


app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer => {
    let myRandomBeer = beer[0];
    res.render('random',myRandomBeer);
  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(3000);
console.log("Running server on port 3000....")