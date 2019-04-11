
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')


//Routes
//Index
app.get('/', (req, res, next) => {
  res.render('index');
});

//Beers
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })
});

//Random beer
app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    console.log(beers[0])
    res.render('randomBeer', beers[0]);
  })
  .catch(error => {
    console.log(error)
  })
});

app.listen(3000);
