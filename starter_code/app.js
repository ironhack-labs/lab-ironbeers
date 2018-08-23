
const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

//Set HBS as our view engine

app.set('views', __dirname + "/views");
app.set('view engine', 'hbs');

//Register the partials

hbs.registerPartials(__dirname + "/views/partials");

//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      var beersArrayObject = { beers: beers }
      res.render('beers', beersArrayObject);
    })
    .catch(error => {
      console.log(error)
    })
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
    .then(beer => {
      res.render('randomBeer', beer[0]
      );
    })
    .catch(error => {
      console.log(error)
    })
})


app.listen(3000); 