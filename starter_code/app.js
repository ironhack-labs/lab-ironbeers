
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
  punkAPI.getBeers()
  .then(beers => {
    res.render('partials/beers',{beers});
  })
  .catch(error => {
    console.log(error)
  })
});

hbs.registerPartials(__dirname + '/views/partials')



// app.get('/random-beer', (req, res, next) => {
//   punkAPI.getBeers()
//   .then(beer => {
    
//     res.render('partials/randomBeer', beer[0]);
//   })
//   .catch(error => {
//     console.log(error)
//   })
// });


app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer => {
    res.render('partials/randomBeer',beer[0]);
  })
  .catch(error => {
    console.log(error)
  })
});


// beer[0]

app.listen(3000);
