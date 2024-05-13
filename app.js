const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials");


// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get(`/breweries`, (req, res) => {
  fetch(`https://api.openbrewerydb.org/v1/breweries`)
  .then((response) => response.json())
  .then((response) => {
        res.render(`breweries`, { breweries: response });
  });
});

app.get(`/randomBrewery`, (req, res) => {
  fetch(`https://api.openbrewerydb.org/v1/breweries/random`)
  .then((response) => response.json())
  .then((response) => {
      const random = response;
        res.render(`randomBrewery`, { random });
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
