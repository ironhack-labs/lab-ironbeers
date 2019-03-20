
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials");

// Routes - START //
app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers() // will get 25 random beers
  .then(beers => {
    // console.log(beers[0]);
    res.render('beers', {beerObject: beers}) // has to be an object (data)
  })
  .catch(error => {
    console.log(error);
  })
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom() // get one random beer (provided as an array though)
  .then(beers => { 
    res.render('randomBeer', {beerObject: beers})
  })
  .catch(error => {
    console.log(error);
  })
});
// Routes - END //

app.listen(3000, () => {
  console.log("Server started - port 3000")
});
