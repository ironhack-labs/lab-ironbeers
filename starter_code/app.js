const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
   punkAPI.getBeers()
    .then(beers => { 
    console.log(beers);
    let data = {
      beerArr: beers
    };
    res.render('beers',data);
    })
    .catch(error => { 
      console.log(error);
    });
});

hbs.registerPartials(__dirname + '/views/partials');

app.get('/random-beers', (req, res, next) => {
  punkAPI
  .getRandom()
  .then(beers => {
    let x = beers[0];
    res.render('random_beers', x);
  })
  .catch(error => {
    console.log(error);
  });
  
});
app.listen(3000);


