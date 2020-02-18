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
app.get('/', (req, res) => res.render(`${__dirname}/views/index`))
app.get('/beers', (req, res) => res.render(`${__dirname}/views/beers`));
app.get('/randombeers', (req, res) => res.render(`${__dirname}/views/randombeers`));
app.listen(3000, () => console.log('🏃‍ on port 3000'));
