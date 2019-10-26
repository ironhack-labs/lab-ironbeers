
const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (request, response, next) => {
  response.render('index');

});

app.get('/beers', (request, response, next) => {
  punkAPI.getBeers()
    .then(beers => {
    response.render('beers', {beers});

    })
    .catch(error => {
      console.log(error)
    })
});

app.get('/random-beers', (request, response, next) => {
  punkAPI.getBeers()
  .then(beers => {
    let randomBeer = Math.round(Math.random() * beers.length)
    console.log(beers[randomBeer]);
    response.render('random-beers', beers[randomBeer]);
  })
  .catch(error => {
    console.log(error)
  })
})


app.listen(3000);
