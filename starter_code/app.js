const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});

//Iteration-3
// Inside the /beers route, call to the getBeers() method of our PunkAPI package.
// The package will return you an array of 25 beers, and you should pass that array to the beers.hbs view.
app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers', { title: 'Beers', beers });
    })
    .catch(error => console.log(error));
});
// app.get('/random-beer', (req, res, next) => {
//   res.render('random-beer', { title: 'Random Beer' });
// });

app.listen(3000, () => console.log(`Server running`));
