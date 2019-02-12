

console.log(__dirname, __filename)

const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// hbs.registerPartial('showABeer', '{{name}}')
hbs.registerPartials(__dirname + '/views/partials')


app.get('/', (req, res, next) => {
  console.log('went to home page')
  res.render('index');
});

app.get('/beers', (req, res, next) => { //first go the the page and this fires
  console.log('went to beers url')
  punkAPI.getBeers() //get all the beer data from PunkAPI 
  .then(beers => {
    //console.log(beers)
    res.render('beers', {data:beers}); //sending all the beers to the front
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer => {
    console.log(beer[0])
   res.render('random-beers', {data: beer[0]});
  })
});

app.listen(3000);

