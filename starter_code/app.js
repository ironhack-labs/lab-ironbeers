
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  data = {
    title: "This beer"
  }
  res.render('index', {data});
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    data = {
      beers: beers,
      title: "Beers"
    }
    res.render('beers', {data});
  })
  .catch(error => {
    console.log(error)
  })

});

app.get('/random-beer', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    data = {
      beer: beers[parseInt(Math.random()*beers.length)],
      title: "Random beer"
    }
    res.render('random-beer', {data});
  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(3000);