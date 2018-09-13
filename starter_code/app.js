
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

app.get('/home', (req, res, next) => {
  res.render('home');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render ('beers',{beers})
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/randombeers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render ('randombeers',{beers})

  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/partialsbeers', (req, res, next) => {
  res.render('partialsbeers');
});



app.listen(3000);


