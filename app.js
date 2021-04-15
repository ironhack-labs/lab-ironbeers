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
hbs.registerPartials(path.join(__dirname, '/views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// /beers page route
app.get('/beers', (req, res) => {
  
  punkAPI.getBeers()
  .then(beersFromApi => { 
  console.log('Beers from the database: ', beersFromApi) 
  res.render('beers', { beersArray: beersFromApi });
  })
  .catch(error => console.log(error))
})

// /random-beers page route
app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(beerFromApi => {
  console.log('Beer from the database: ', beerFromApi)
  res.render('random-beer', { randomBeer: beerFromApi[0] })
  })
  .catch(error => console.log(error)); 
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
