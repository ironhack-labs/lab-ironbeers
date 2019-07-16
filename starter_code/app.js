
const express = require('express');
const app     = express();

const hbs     = require('hbs');
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    // We render the page with all the beers once we loaded all of them
    res.render('beers.hbs', {beers});
    // by writing {beers} we pass the result of our request in the API (beers) as a variable 
    // than we can use in beers.hbs but also the partials that we'll use on this beers.hbs
    console.log(beers)
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('random.hbs', {beer: beers[0]});
    console.log(beers)
  })
  .catch(error => {
    console.log(error)
  })
});

app.listen(3000);
