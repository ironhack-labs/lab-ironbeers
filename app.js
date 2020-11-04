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
// Route to Beers
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then((beersFromApi) => {res.render('beers', { beersFromApi });
    console.log('Beers from the database: ', beersFromApi)
  })
  .catch(error => console.log(error));
})
// Route to random beers
console.log("Before entering the /random-beers");

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
  .then((beersFromRandom) => {res.render('random-beers', { beersFromRandom });
  })
  .catch(error => console.log(error));
})
app.listen(3001, () => console.log('🏃‍ on port 3001'));
