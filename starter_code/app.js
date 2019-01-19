
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


//First route
app.get('/', (req, res, next) => {
  res.render('index');
});

//Second route
app.get('/beers', (req, res, next) => {
  res.render('beers');
});

//Third route
app.get('/random-beer', (req, res, next) => {
  res.render('random-beer');
});

app.listen(3000);
