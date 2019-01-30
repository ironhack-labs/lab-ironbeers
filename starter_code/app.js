const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res,nxt) => {
  res.render('index');
});

app.get('/beers', (req,res,nxt) => {
  punkAPI.getBeers().then(beers => {
    res.render('beers', {beers})
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/randombeer', (req,res,nxt) => {
  punkAPI.getBeers().then(beers => {
    var beer = beers[0]
    res.render('randombeer', {beer})
  })
  .catch(error => {
    console.log(error)
  })
});

app.listen(3000);