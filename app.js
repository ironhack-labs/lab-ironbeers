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

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  // iteration 3.1 (need some clarification)
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    res.render('beers.hbs', {beersFromAPI}); 
 })
 .catch(error => console.log(error));
  })

  app.get('/random-beer', (req, res) => {
    punkAPI
  .getRandom()
  .then(responseFromAPI => {
    // your magic happens here
    console.log(response)
    res.render('random-beer.hbs', {responseFromAPI:responseFromAPI[0]});
  })
  .catch(error => console.log(error));
  })  



  




app.listen(3000, () => console.log('🏃‍ on port 3000'));
