const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


//ROUTES
app.get('/', (req, res, next) => {
  res.render('index.hbs');
});


app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(responseFromAPI => {
      // console.log('Beers from database:', responseFromAPI);
      res.render('beers', { responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log('Beers from database:', responseFromAPI);
      res.render('random-beer', { responseFromAPI });
    })
    .catch(error => console.log(error));
});


// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:


app.get('/views/partials/beerpartial.hbs', (req, res) => {
  punkAPI
    .getBeers()
    .then(responseFromAPI => {
      res.render('beerpartial',{ responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
