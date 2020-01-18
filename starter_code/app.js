const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

// Handlebars.registerHelper('ifeq', function(a, b, options) {
//   if (a == b) {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });

// /Routes:
app.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});

// Iteration - 3;
// Inside the /beers route, call to the getBeers() method of our PunkAPI package.
// The package will return you an array of 25 beers, and you should pass that array to the beers.hbs view.
app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      // console.log('Output for: beers', beers.length);

      res.render('beers', {
        title: 'Beers',
        myStyle: ' stylesheets/beers.css',
        beers,
        len: false
      });
    })
    .catch(error => console.log(error));
});
app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beers => {
      // console.log('Output for: beers', beers.length);

      res.render('randomBeer', {
        title: 'Random Beer',
        myStyle: 'stylesheets/randomBeer.css',
        beers,
        len: true
      });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log(`Server running`));
