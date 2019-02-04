const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// Iteration 5 - Beer Partial
hbs.registerPartials(__dirname + '/views/partials')

// Home. ----> Should navigate to /.
app.get('/', (req, res, next) => {
  res.render('index');
});

// Beers. ----> Should navigate to /beers.
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      // console.log(beers);
      res.render('beers', {
        beers
      });
    })
    .catch(error => {
      console.log(error)
    })
});

// Random Beer. ----> Should navigate to /random-beers.
app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      res.render('random-beer', {beers});
    })
    .catch(error => {
      console.log(error)
    })
});


app.listen(3001);