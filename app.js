const express = require('express');

const hbs = require('hbs');
const path = require('path');
const axios = require('axios');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  axios.get('https://api.openbrewerydb.org/v1/breweries')
    .then(response => res.render('beers', {data: response.data}))
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  axios.get('https://api.openbrewerydb.org/v1/breweries/random')
    .then(response => res.render('random-beer', {data: response.data}))
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
