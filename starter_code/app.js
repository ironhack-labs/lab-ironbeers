//Definition of variables to use the paths
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


//Set view engine to HSB instead of HTML to use handlebars/layouts.
app.set('view engine', 'hbs');

//Skips adding /views when it comes to file paths
app.set('views', __dirname + '/views');

//Skips need to use /public in linking css/other files.
app.use(express.static(path.join(__dirname, 'public')));


//Setting partials target
hbs.registerPartials(__dirname + '/views/partials/')


//Index.hbs path
app.get('/', (req, res, next) => {
  res.render('index');
});

//Beers.hbs path
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers: beers});
  });
});

//randomBeers.hbs path
app.get('/randomBeers', (req, res, next)=> {
  punkAPI.getRandom()
  .then(beer => {
    res.render('randomBeers', beer[0]);
  });
});





app.listen(3000);