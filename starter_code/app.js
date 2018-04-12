'use strict';

const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, "/views/partials"));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      const data = {beers} // ¡¡¡IMPORTANT to do that while accessing API => has to be OBJECT!!!
      res.render("beers", data);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
    .then(randomBeers => {
      const data = {randomBeers: randomBeers[0]} // ¡¡¡IMPORTANT to do that while accessing API => has to be OBJECT!!!
      console.log(randomBeers);
      res.render("randombeers", data);
    })
    .catch(error => {
      console.log(error);
    });  
});


app.listen(3000);