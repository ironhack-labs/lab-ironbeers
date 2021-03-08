const express = require('express');

const hbs = require('hbs');
const { get } = require('http');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
// Ignore partials for now
// ...

// Add the route handlers here:

// Home
app.get('/', (req, res) => {
  res.render('index');
});

// Create a /beers route inside the app.js file
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    // success
    .then(dataBack => {
      console.log('dataBack:', dataBack);
      res.render('beers', { beers: dataBack });
    })
    // failure state
    .catch(err => {
      console.log(err);
    });
});

// Create a /random-beer route inside the app.js file
// app.get('/random-beers', (req, res) => {
//   res.render('random-beer');
// });

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(dataBack => {
      console.log('dataBack:', dataBack[0]);
      // first arguement of render is the hbs file coming from views folder root, the object is then named as you would like it
      res.render('random-beer', { randomBeer: dataBack[0] });
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
