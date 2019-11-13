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

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {
      beers
    });
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(randomBeers => {
    console.log(randomBeers);
    res.render('random-beers', {
      randomBeers
    });
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/single-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(singleBeer => {
    console.log(singleBeer);
    res.render('single-beer', {
      singleBeer
    });
  })
  .catch(error => {
    console.log(error)
  })
});


app.get('/beers/:id', (req, res, next) => {
 const beerNum = req.params.id
  console.log(beerNum)
  punkAPI.getBeer(beerNum)
  .then(singleBeer => {
    res.render('single-beer', {
      singleBeer
    });
  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(3000);
