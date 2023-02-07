const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...
app.get('/', (req, res) => {
  res.render('index')
});
// Add the route handlers here:
app.get('/beers', (req, res) => {
  // console.log('hola beer')
  //const getBeers = PunkAPI.getBeers()
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi)
      res.render('beers', { beers: beersFromApi })
    })
    .catch(error => console.log(error))

})
app.get('/randomBeer', (req, res) => {
  // console.log('hola random beer')
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi)
      res.render('randomBeer', { beers: beersFromApi })
    })
    .catch(error => console.log(error))
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
