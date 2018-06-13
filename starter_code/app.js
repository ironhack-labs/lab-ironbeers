
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

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  
  const allBeers = punkAPI.getBeers()
  
   allBeers.then(beers => {

    console.log(beers.name)

    res.render('beers', {beers});
  })
    allBeers.catch(error => {
    console.log(error)
  })
  
  
});

app.get('/random-beers', (req, res, next) => {
  const randomBeer = punkAPI.getRandom();

  randomBeer.then(beer => {
    console.log(beer[0])
   res.render('random-beers', beer[0])
  })

  randomBeer.catch(error => {
    console.log(error)
  })
  
  
});


app.listen(3000);