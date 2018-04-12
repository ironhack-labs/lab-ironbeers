
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.set('laylout', __dirname + '/views/layout.hbs');
hbs.registerPartials(__dirname + '/views/partials');

//home page
app.get('/', (req, res, next) => {
  res.render('index.hbs');
});

//beers page
app.get('/beers', (req, res, next) => {
   punkAPI.getBeers()
   .then(beers => {
    res.locals.beers = beers;
    res.render('beers.hbs');
    console.log(beers);
    
  })
  
  .catch(error => {
    console.log(error)
  })
  
});

//random-beers page
app.get('/random-beers', (req, res, next) => {
  res.render('random-beers.hbs');
});


app.listen(3000);