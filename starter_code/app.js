// require all the packages you install
const express = require('express');
const app = express();

// package that allows templating and dynamic views
const hbs = require('hbs');

const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();

// sets hbs as default view engine
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


// in order to use the partials I have to register them!
hbs.registerPartials(__dirname + '/views/partials');


// routes:

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers);
    res.render('beers', beers);
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/randomBeers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('randomBeers', beers);
  })
  .catch(error => {
    console.log(error)
  })
});

app.listen(3000, () => console.log("Listening IronBeers on 3000."));
