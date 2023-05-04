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
hbs.registerPartials(path.join(__dirname + '/views/partials'));

// Add the route handlers here:
// Route to Home page
app.get('/', (req, res) => {res.render('index')});

// Route to Beers page
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {console.log('Beers from the database: ', beersFromApi),
  res.render('beers', {beersFromApi})
})
  .catch(error => console.log(error))
  });


  // Route to Random Beers page
app.get('/randomBeer', (req, res) => {
  punkAPI.getRandom()
  .then(responseFromAPI => {console.log('Beers from the database: ', responseFromAPI),
  res.render('randomBeer', {responseFromAPI})
})
.catch(error => console.log(error))
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
