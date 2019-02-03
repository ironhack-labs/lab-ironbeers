
const express = require('express');

const app = express();
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();
// const randomBeer = punkAPI.getRandom();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers);
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random', (req, res, next) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer.then(beer => {
    // alert(beer[0].name)
    let beer2 = randomBeer;
    console.log(beer[0]);
    res.render('random', {beer});
  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(3000);
