
const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



//-----------
// ROUTES
//-----------

// home
app.get('/', (req, res, next) => {
  res.render('index')
})

// beers 
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(error => {
      console.log(error)
    })
})

// random beer
app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      let beer = beers[0]
      res.render('random-beer', { beer })
    })
    .catch(error => {
      console.log(error)
    })
})


app.listen(3000);
