const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { Z_BEST_COMPRESSION } = require('zlib');

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

app.get('/beers', (req, res, next) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render("beers", {beersFromApi});
  })
  .catch(error => console.log(error));
});

  app.get('/random-beers', (req, res, next) => {
    punkAPI
    .getRandom()
    .then(beersFromApi => {
        res.render("random-beers", {randombeers: beersFromApi});
        console.log(beersFromApi);
      })
      .catch(error => console.log(error));
    });


app.listen(3000, () => console.log('🏃‍ http://localhost:3000'));
