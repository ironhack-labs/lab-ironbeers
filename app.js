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

// HOMEPAGE
app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((beersList) => {
      console.log(beersList)
      res.render('beers', { beersList })
    }).catch(error => console.log(error));
  });
  app.get('/random-beer', (req, res) => {
    punkAPI
      .getRandom()
      .then((beersList) =>
        res.render('random', { beersList }))
      .catch(error => console.log(error));
    // res.render('index');
  });

  app.listen(3000, () => console.log('🏃‍ on port 3000'));
