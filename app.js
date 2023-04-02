const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
app.use(express.static("public"));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Add the route handlers here:

app.get('/', (req, res, next) => {
  const filePath = path.join(__dirname, "views", "index.html");
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const filePath = path.join(__dirname, "views", "beers.html");
  const strongBeers = punkAPI.getBeers({}).then(beersFromApi => res.render('beers'));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

// punkAPI
//   .getBeers()
//   .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
//   .catch(error => console.log(error));

