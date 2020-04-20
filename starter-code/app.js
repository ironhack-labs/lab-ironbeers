const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// ROUTES
// Homepage
app.get('/', (req, res) => res.render('index'));

// List of Beers
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((dbRes) => {
      console.log(dbRes);
      res.render('beers', { beers: dbRes });
    })
    .catch((error) => console.log(error));
});

// Random Beer
app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then((dbRes) => {
      console.log(dbRes);
      res.render('beer', { beer: dbRes[0] });
    })
    .catch((error) => console.log(error));
});

// Specific Beer
app.get('/beer/:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then((dbRes) => {
      console.log(dbRes);
      res.render('beer', { beer: dbRes[0] });
    })
    .catch((error) => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
