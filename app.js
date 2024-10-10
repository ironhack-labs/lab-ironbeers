const express = require('express');

const hbs = require('hbs');
const path = require('path');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

app.get('/', (req, res, next) => res.render('index'));

app.get('/breweries', (req, res, next) =>
  fetch('https://api.openbrewerydb.org/v1/breweries?per_page=25')
    .then((response) => response.json())
    .then((response) => res.render('breweries', {breweries: response}))
    .catch((err) => {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
    })
);

app.get('/random-breweries', (req, res, next) =>
  fetch('https://api.openbrewerydb.org/v1/breweries/random')
    .then((response) => response.json())
    .then((response) => res.render('random-breweries', {brewery: response}))
    .catch((err) => {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
    })
);

// Add the route handlers here:

app.listen(3000, () => console.log('🏃‍ on port 3000'));
