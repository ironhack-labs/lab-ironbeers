
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (require, response) => {

    response.render('index');
});

app.get('/beers', (require, response) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers)
    response.render('beers.hbs', {beers});
  })
  .catch(error => {
    console.log(error)
  })  
});


app.get('/randomBeers', (require, response) => {
  punkAPI.getRandom()
  .then(randomBeers => {
    console.log(randomBeers)
    response.render('randomBeers.hbs', {randomBeers});
  })
  .catch(error => {
    console.log(error)
  })
});



app.listen(3000);
