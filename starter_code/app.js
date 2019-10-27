
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials');

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
    console.log(error);
  })
});

app.get('/random-beer', (request, response, next) => {
  punkAPI.getRandom()
  
  .then(beers => {
    console.log(beers);
    response.render('randomBeer',{beers} );
  })
  .catch(error => {
    console.log(error)
  })
  
})

app.listen(3000);



