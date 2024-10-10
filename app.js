const express = require('express');
const axios = require('axios')
const hbs = require('hbs');
const path = require('path');

const app = express();
const port = 3000;


// const PunkAPIWrapper = require('punkapi-javascript-wrapper');
// const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => res.render('index', ));

// res.render('index');

app.get('/beers', (req, res) =>  {
  axios.get('https://api.openbrewerydb.org/v1/breweries')
  .then((response) => {
    console.log('response', response.data)
    res.render('beers', { breweries: response.data})
  })
  .catch((err) => console.log(err))
});

app.get('/random-beer', (req, res) => {
  axios.get('https://api.openbrewerydb.org/v1/breweries/random')
    .then((response) => {
      console.log('response', response.data)
      res.render('random-beer', {random: response.data })
    });
    });
  

app.listen(3000, () => console.log('🏃‍ on port 3000'));
