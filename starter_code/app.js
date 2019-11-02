
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials")


// HOME PAGE
app.get('/', (req, res, next) => {
  res.render("index")
});



// BEERS
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render("beers", {beers})
  })
  .catch(error => {
    console.log(error)
  })
});

// RANDOM BEERS

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
    .then(beer => {
      res.render("randombeers", { beer: beer[0] })
    })
    .catch(error => {
      console.log(error)
    })
  
  
  });
  

app.listen(3000);
