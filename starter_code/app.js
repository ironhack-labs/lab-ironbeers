'use strict';

const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});
app.get('/beers', (req, res, next) => {
  res.render('beers');
});
app.get('/random', (req, res, next) => {
  res.render('random');
});

// beers middleware
app.get('/beer/:id', function (request, response) {
  var beer = punkAPI.getBeer(request.params.id);

  beer.then(beer => {
    response.json(beer[0]);
  });
});

// -- 404 and error handler

// NOTE: requires a views/not-found.ejs template
app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

app.listen(3000);
module.exports = app;
