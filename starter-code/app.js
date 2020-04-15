const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
const punkAPI = new PunkAPIWrapper();

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => res.render('beers'));
app.get('/randombeers', (req, res) => res.render('randombeers'));

app.listen(3000, () => console.log('🏃‍ on http://localhost:3000'));
