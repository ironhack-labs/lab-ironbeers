const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res, next) => {

  const data = {
    title: "Home",
    lennyFace: "( ͡° ͜ʖ ͡°)"
  };

  res.render('index', data);
});

app.get('/beers', (req, res, next) => {

  const data = {
    title: "Beers",
    lennyFace: "( ͡~ ͜ʖ ͡°)"
  };

  punkAPI.getBeers()
    .then(beers => {
      data.beerList = beers;
      res.render('beers', data);
    })
    .catch(error => {
      console.log(error);
    })

});

app.get('/random-beers', (req, res, next) => {

  const data = {
    title: "Random Beers",
    lennyFace: "( ͡◉ ͜ʖ ͡◉)"
  };

  punkAPI.randomBeer()
  .then(beers => {
    res.render('random-beers', data);
  })
  .catch(error => {
    console.log(error)
  })

});


app.listen(3000);