
const express = require('express');
const hbs     = require('hbs');
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app     = express();
const punkAPI = new PunkAPIWrapper();

app.use(express.static(path.join(__dirname, './public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  res.render('beers');
});

app.get('/random', (req, res, next) => {
  res.render('random');
});

app.listen(3000);
