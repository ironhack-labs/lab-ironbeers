const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// hbs setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// partial setup
hbs.registerPartials(__dirname + '/views/partials');

// static serving setup
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index.hbs');
});
app.get('/beers', (req, res) => {
  res.render('beers.hbs');
});
app.get('/random-beers', (req, res) => {
  res.render('random-beers.hbs');
});

app.listen(3000);
