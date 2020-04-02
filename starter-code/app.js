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

//To the route /
app.get('/', (req, res) => res.render('index'));

//To the page beers
app.get('/beers', (req, res) => res.render('beers'));

//To the page random-beer
app.get('/random-beer', (req, res) => res.render('random-beer'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
