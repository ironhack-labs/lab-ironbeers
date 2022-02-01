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
hbs.registerPartials(`${__dirname}/views/partials`);
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  //console.log('hola');
  res.render('index');
});

app.get('/beers-page', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers-page', { theBeers: beersFromApi });
      console.log('beers: ', beersFromApi);
    })
    .catch(error => console.log(error));
});

app.get('/random-beer-page', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFomAPI => {
      res.render('random-beer-page', responseFomAPI[0]);
      console.log(responseFomAPI);
    })
    .catch(error => console.log(error));
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));
