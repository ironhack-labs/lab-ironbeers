
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

//this route is for pulling all the beers from the database
app.get('/beers', (req, res, next) => {
  //getBeers is like a function that pulls from the database
  punkAPI.getBeers()
  .then(theListOfBeers => {

    res.render('beers', {beers: theListOfBeers});
  })
  .catch(error => {
    console.log(error)
  })


});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(theRandomBeer => {

    res.render('random-beers', {oneBeer: theRandomBeer});
  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(3000);
