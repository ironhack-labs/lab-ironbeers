
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');



app.get('/', (req, res, next) => {
  let data = {
    img: "/images/beer.png",
    botonTo: "/beers",
    botonToRandom: "/randomBeer",
  };
  res.render('index', data);
  
});

app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
  .then(beers => {
    console.log(beers[0])
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })

  
});

app.get('/randomBeer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('randomBeer', { beer: beers[0] });
  })
  .catch(error => {
    console.log(error)
  })


});


app.listen(3000);
