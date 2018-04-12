const express = require('express');
const app = express();

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.set('layout', __dirname + '/views/layout.hbs');
hbs.registerPartials(__dirname + '/views/partials');

// Route

app.get('/', (req, res, next) => {
  res.render('index');
});

// ---------------

app.get('/beers', (request, response, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      response.locals.beers = beers;
      response.render('beers.hbs');
      console.log(beers);
    })
    .catch(error => {
      console.log(error);
    });
});

// ---------------

app.get('/random-beers', (request, response, next) => {
  response.render('beers.hbs');
});

// Fin de route

app.listen(3000, () => {
  console.log('server online!!!!!');
});
