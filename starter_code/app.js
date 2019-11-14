const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')


app.get('/', (req, res, next) => {
  res.render('index');
});

// beers route
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {
        beers
      })
    })
    .catch(error => {
      console.log("beerror")
    })
})

// random beers route
app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
    .then(beers => {
      res.render('randomBeers', {
        beers
      });
    })
    .catch(error => {
      console.log(beerror)
    })
});

// render random beers ...?

app.get('/random-beers', (req, res) => {
  
  res.render('randomBeers');
})




app.listen(3000);