const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


//Home Page
app.get('/', (req, res, next) => {
  res.render('index');
});

//Beers Page
app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
  .then(beers => {
    res.render('beers');
  })
  .catch(error => {
    console.log(error)
  })
});

//Random beer
app.get('/random', (req, res, next) => {
  punkAPI.getRandom()

  .then(beers => {
    console.log(beers)
    res.render('random-beers');
        
      })
      .catch(error => {
        console.log(error)
      })


app.listen(3000);
});