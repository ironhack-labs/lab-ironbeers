const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials")

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

// 
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/selected', (req, res) => {
  res.render('selected');
});

app.get('/beers', (req, res) => {

  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render("beers", { beersInfo: beersFromApi })
    })
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beer', { beerRandom: responseFromAPI })
    })
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
