const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const randomBeer = punkAPI.getRandom();
const beersArr = punkAPI.getBeers();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');


app.get('/beers', (req, res, next) => {
  beersArr.then(beers => {
    // console.log(beers);
        res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error);
  })
});

app.get('/random-beer', (req, res, next) => {
  randomBeer.then(beer => {
    console.log(beer);
    res.render('randomBeer', {beer});
  })
  .catch(error => {
    console.log(error);
  })
});

app.get('/', (req, res, next) => {
  res.render('index');
});


app.listen(3000);