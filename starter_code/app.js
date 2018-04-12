
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  response.render ("layout.hbs");
});

app.get('/random-beers', (req, res, next) => {
  const index = Math.floor (Math.random ()*2);
  const chosenBeer = allBeer [index];

  // "locals meaning the local variables INSIDE YOUR VIEWS"
  response.locals.Beer = chosenBeer;
  response.render ("layout.hbs");
});


app.listen(3000);