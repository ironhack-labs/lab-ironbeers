const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

let beers = [];

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/Partials');


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/home', (req, res) => {
  res.render("index.hbs");
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((beersFromApi) => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers.hbs',  beersFromApi );console.log("Test")
    })
    .catch((error) => console.log(error));
});

app.get('/random-beers', (req, res) => {
  res.render("random-beers");
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
