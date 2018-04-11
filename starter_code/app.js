'use strict';

const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// -- configure the app

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// -- fake database

const beers = [{
  name: 'Madrid',
  price: '9.75 euros'
}, {
  name: 'Amsterdam',
  price: '10.75 euros'
}, {
  name: 'Paris',
  price: '8.75 euros'
}, {
  name: 'Barcelona',
  price: '6.75 euros'
}];


// -- routes

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  /*
  punkAPI.getBeers()
    .then(beers => {
      console.log(beers[0]);
    })
    .catch(error => {
      console.log(error);
    });
  */
  
  const data = {
    allBeers: beers
  };
  
  res.render('beers', data);
});

app.get('/random-beer', (req, res) => {
  let randomNumber = Math.floor(Math.random() * 4);
  const data = {
    myRandomBeer: beers[randomNumber]
  };
  res.render('random-beer', data);
});

// -- start the app

app.listen(3000, () => console.log('listening on port 3000!'));
