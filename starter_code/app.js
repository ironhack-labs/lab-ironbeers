const express = require('express');
const hbs = require('hbs');
<<<<<<< HEAD

const app = express();
const path = require('path');

=======
const app = express();
const path = require('path');
>>>>>>> f75e9402a343512e9de6e81113886ec1a48d431b
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

// eslint-disable-next-line no-unused-vars
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
hbs.registerPartials(`${__dirname}/views/partials`);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then((beers) => {
      // console.log(beers[0].food_pairing);
      res.render('beers', { beers });
    });
=======
// Iteration 5 - Beer Partial
hbs.registerPartials(__dirname + '/views/partials')

// Home. ----> Should navigate to /.
app.get('/', (req, res, next) => {
  res.render('index');
});

// Beers. ----> Should navigate to /beers.
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      // console.log(beers);
      res.render('beers', {
        beers
      });
    })
    .catch(error => {
      console.log(error)
    })
});

// Random Beer. ----> Should navigate to /random-beers.
app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      res.render('random-beer', {beers});
    })
    .catch(error => {
      console.log(error)
    })
>>>>>>> f75e9402a343512e9de6e81113886ec1a48d431b
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then((beers) => {
      res.render('randomBeer', { beers });
    });
});

app.listen(3001);