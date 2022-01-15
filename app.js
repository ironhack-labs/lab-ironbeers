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

app.get('/beer', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      let beers = [...beersFromApi];
      res.render('beer', { beers });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  res.render('random-beer');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
