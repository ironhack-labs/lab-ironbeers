const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {
        beers: beers
      });
    })
    .catch(error => {
      console.log(error)
    });
});

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
    .then(beers => {
      const beer = beers[0]
      console.log(beer.name);

      res.render('random-beers', {
        beer
      });
    })
    .catch(error => {
      console.log(error)
    });
});

app.listen(3000); 