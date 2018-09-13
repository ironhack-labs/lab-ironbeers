const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res) => {
  let data= {
    src:"/images/beer.png"
  }
  res.render('index',data);
});


app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers',{beers});
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/randomBeer', (req, res) => {
punkAPI.getRandom()
  .then(beers => {
    res.render('randomBeer',{beers});
  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(3000);