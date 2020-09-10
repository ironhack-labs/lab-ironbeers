// ------------ Declarations
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();

const punkAPI = new PunkAPIWrapper();

// ------------ Configurations
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// ------------ Code

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, '/views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/randombeer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('randombeer', { responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.get('/beerID/:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then(responseFromAPI => {
      res.render('randombeer', { responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.listen(1234, () => console.log('On port 1234'));

// if(req.params.random == "random"){
//   var myRandom = true
// }

//     res.render('beers', { responseFromAPI,  randommyRandom});
