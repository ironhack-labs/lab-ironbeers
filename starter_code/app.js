
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// We are using the layout.hbs file as our layout
app.set("layout", __dirname + "/views/layout.hbs");

// Our partials can be found in the "views/partials/" folder
hbs.registerPartials(__dirname + '/views/partials');

// Routes 
// ----------------------------------------------------------------------------------
app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
  .then(beers => {
    // console.log(beers);

    res.locals.beersList = beers;
    res.render('beers');
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beers', (req, res, next) => {

  punkAPI.getRandom()
  .then(beer => {
    console.log(beer);

    res.locals.randomBeer = beer[0];
    res.locals.foodPairing = beer[0].food_pairing;
    res.render('random-beers');
  })
  .catch(error => {
    console.log(error)
  })
});

// ----------------------------------------------------------------------------------

app.listen(3000, () => {
  console.log("Server online :)");
});