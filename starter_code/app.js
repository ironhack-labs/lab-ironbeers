
const express = require('express');
const app     = express();
const path    = require('path');
const expressLayouts= require ('express-ejs-layouts');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const port = 3000;

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then (beers =>{
    console.log(beers);
    res.render('beers',{beers});
   
  })
  .catch(error =>{
    console.log(error)
  })
  
});

app.get('/random-beers', (req, res, next) => {
  res.render('random-beers');
});


app.listen(port , (error) => {
  error ? console.log(error) : console.log (`Live at ${port}`)
});