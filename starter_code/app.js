
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
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log('beers', beers.length, beers[0])
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })
  
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(randomBeer => {
    console.log('random', randomBeer)
    console.log(`random beer`, randomBeer[0].food_pairing[0])
    res.render('random-beers', randomBeer[0]);
  })
  .catch(error => {
    console.log(error)
  })
});



app.listen(3000);
