
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {array: beers}) ;
  })
  .catch(error => {
    console.log(error)
  })

});
app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('random-beers', beers[0]) ;
  })
  .catch(error => {
    console.log(error)
  })

});


app.listen(3000);