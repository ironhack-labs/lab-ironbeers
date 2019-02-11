
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// const randomBeer = punkAPI.getRandom()
// const allBeers = punkAPI.getBeers()
// randomBeer.then(beer => {
//   //console.log(beer[0].name)
// })

// allBeers.then(beer => {
//   console.log(beer)
// })

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')


app.get('/', (req, res, next) => {
  res.render('index');
});

//Beers
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    //console.log(beers);
    res.render('beers',{beers});
  })
  .catch(error => {
    console.log(error)
  })
});

//Random Beers
app.get('/randomBeer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer => {
    console.log(beer[0].name);
    res.render('randomBeer',{beer:beer[0]});
  })
  .catch(error => {
    console.log(error)
  })
});

app.listen(3000);
