
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

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const beers = punkAPI.getBeers();

  beers.then(beers => {
    // alert(beer[0].name);
    // console.log(beers)
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error);
  });
// console.log(beers)
//   res.render('beers', beers);
});

app.get('/random-beer', (req, res, next) => {
  const randomBeers = punkAPI.getRandom();

  randomBeers.then(beers => {
    // alert(beer[0].name);
    console.log(randomBeers);
    res.render('randomBeer', randomBeers);
  })
  .catch(error => {
    console.log(error);
  });
});


app.listen(3000);