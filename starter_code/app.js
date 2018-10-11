
const express = require('express');
const app     = express();
const path    = require('path');
const expressLayouts = require('express-ejs-layouts');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const port = 4000;


app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.set('layout', 'layouts/main');



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
  .then(beers => {
    res.render('beers',{beers});
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beers', (req, res, next) => {

  punkAPI.getRandom()
  .then(beer => {
    res.render('random-beers',{beer});
  })
  .catch(error => {
    console.log(error)
  })
});





app.listen(port, (error) => {
  error ? console.log(error) : console.log('Running on 4000') ;
})
