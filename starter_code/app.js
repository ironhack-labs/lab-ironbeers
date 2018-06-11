
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const allBeers = punkAPI.getBeers()
  
   allBeers.then(beers => {
    let data = {
      myObjects: beers
    }

    res.render('beers', data);
  })
    allBeers.catch(error => {
    console.log(error)
  })
  
  
});

app.get('/random-beers', (req, res, next) => {
  const randomBeer = punkAPI.getRandom();

  randomBeer.then(beer => {
    let data = {theActualRandomBeer: beer[0]}
    
    res.render('random-beers', data)
  })

  randomBeer.catch(error => {
    console.log(error)
  })
  
  
});


app.listen(3000);