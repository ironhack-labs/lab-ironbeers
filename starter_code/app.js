
const express = require('express');
const hbs     = require('hbs');
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const cows    = require('cows');
const punkAPI = new PunkAPIWrapper();

const app     = express();
const vacas   = cows();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      // let counter;
      // beers.dato = false;
      // for(let i = 0; i < beers.length; i++){
      //   if (i % 3 == 0){
      //     beers[i].dato = true;
      //   };
      //   console.log(beers[i].dato);
      // };
      res.render('beers', { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/randomBeers', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      // console.log(beers[0].name);
      res.render('randomBeers', { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
console.log('App inicianlizada');
