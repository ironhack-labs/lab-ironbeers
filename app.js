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
  // res.send('<h1>PROBANDO</h1>');
  res.render('index');
});

app.get('/beers', (req, res) => {
  // res.send('<h1>PROBANDO</h1>');
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      //console.log('Beers from the database: ', beersFromApi)
      res.render('beers', { theBeers: beersFromApi });
      console.log(beersFromApi);
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beer', responseFromAPI[0]);
      console.log(responseFromAPI);
    })
    .catch(error => console.log(error));
});

app.get('/beers/beer-:id', (req, res) => {
  // console.log(req.params.id);
  punkAPI
    .getBeer(req.params.id)
    .then(beersFromApi => {
      res.render('random-beer', { theBeers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.listen(5000, () => console.log('🏃‍ on port 5000'));
