const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersApi => {
    console.log(beersApi)
    res.render('beers', {beersApi})
  })
  .catch(err => console.log(err))
  /* res.render('beers'); */
});

app.get('/random', (req, res) => {
  res.render('random');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
