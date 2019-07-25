
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


app.get('/Beers', (req, res, next) => {
punkAPI.getBeers()
  .then(beers => {
    res.render('Beers', {beers});
    console.log(beers)
  })
  .catch(error => {
    console.log(error)
  })
punkAPI.getRandom()
  .then(beers => {
    res.render('Random_Beer', {beers});
    console.log(beers)

  })
  .catch(error => {
    console.log(error)
  })
  
});

app.get('/Random_Beer', (req, res, next) => {
  res.render('Random Beer');
});

app.listen(3000);
