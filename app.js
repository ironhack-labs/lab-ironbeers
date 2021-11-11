const { response } = require('express');
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

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.all('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => { //this will return a promise
      res.render('beers', {beersFromApi}); //converting the array into an pbject
    })
    .catch(error => console.log(error));
});

app.all('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromApi => {
      console.log(responseFromApi);
      res.render('random-beer', {responseFromApi});
    })
    .catch(error => console.log(error));
});

app.listen(3005, () => console.log('🏃‍ on port 3005'));
