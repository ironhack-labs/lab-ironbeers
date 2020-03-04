const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

// added lines below 

app.get('/beers', (req, res) => {
    punkAPI.getBeers()
    .then(beer => res.render('beers', {beer}))
    //   .catch(error => console.log(error)); not sure if I need to add it here
  });

app.get('/random-beer', (req, res) => {
    punkAPI.getRandom()
    .then(beer => res.render('random-beer', {beer}))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
