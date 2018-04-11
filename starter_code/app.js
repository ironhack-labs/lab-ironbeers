const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')
app.get('/', (req, res) => {
  let fondo= {
    img: "images/beer.png",
  };
  res.render('index', fondo);
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers);
    res.render('beers',{beers});

  })
  .catch(error => {
    console.log(error)
  })
});
app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('random-beer',{beers});
  })
  .catch(error => {
    console.log(error)
  })
});

app.listen(3000);