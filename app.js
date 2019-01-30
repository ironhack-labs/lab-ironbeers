
// Get packages

const express = require('express');
const ejs     = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const port = 3000;

// Set ejs

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Set ejs Layouts

app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Set Express to serve static files

app.use(express.static('assets'));

// Set routes

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  res.render('beers');
});

app.get('/randomBeer', (req, res, next) => {
  res.render('randomBeer');
});

app.listen(port);
