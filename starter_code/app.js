
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/Partials')


app.get('/', (req, res, next) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res, next) => { //whats in chrome 
  
  punkAPI.getBeers()
  .then(beers => {
    console.log("Beer is returning", beers)
    res.render('Beers.hbs', {beers} ); //refers to the hbs file 
  })
  .catch(error => {
    console.log(error)
  })

});

app.get('/RandomBeer', (req, res, next) => {

  punkAPI.getRandom()
  .then(beers => {
    console.log("RandomBeer is returning", beers)
    res.render('RandomBeer.hbs', {beers} ); //refers to the hbs file 
  })
  .catch(error => {
    console.log(error)
  })
});



 
app.listen(3000);
