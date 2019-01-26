
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



app.get('/', (req, res, next) => {
  res.render('home');  
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beerData => {
    res.render('beers', beerData);
  })
  .catch(error => {
    console.log(error)
  })
    
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beerData => {
    res.render('random-beers', beerData[0]);
  })
  .catch(error => {
    console.log(error)
  })
  
});



app.listen(3000);
