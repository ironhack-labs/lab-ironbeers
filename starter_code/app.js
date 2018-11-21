
const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {

});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(err => {
      console.log(err);
    })
})

app.get('/randombeer', (req, res) => {
  punkAPI.getRandom()
    .then(randomBeer => {
      console.log(randomBeer)
      res.render('random', { randomBeer })
    }).catch(err => {
      console.log(err);
    })
})



app.listen(3000, () => {
  console.log('Server initialized');

});
