const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');                      // hbs setup
app.set('views', path.join(__dirname, 'views'));    // hbs setup

app.use(express.static(path.join(__dirname, 'public')));  // public

// Register the location for handlebars partials here:
hbs.registerPartials(`${__dirname}/views/partials`);
// ...

// Add the route handlers here:

// punkAPI
//   .getBeers()
//   .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
//   .catch(error => console.log(error));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beersArray: beersFromApi });
    }) 
  .catch(error => {
    console.log(error);
  })
})

// Example: const randomBeer = punkAPI.getRandom()
app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      // your magic happens here
      res.render('randomBeers', { randomBeer: responseFromAPI });
    })
    .catch(error => console.log(error));
})
// GET /user/tj
// console.dir(req.params.name)
// => 'tj'
// getBeer(:id)
app.get('/beers/id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then(beersFromApi => res.render('beers', { beersArray: beersFromApi }))
    .catch(error => console.log(error))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
