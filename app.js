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


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi)
      res.render('beers',{beersInfo:beersFromApi} )
    })
    .catch(error => console.log(error));
  
})

app.get('/randomBeers', (req, res) => {

  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log('randomBeer: ', responseFromAPI)
    res.render('randomBeers', responseFromAPI[0] )
  })
  .catch(error => console.log(error));
  
})

app.get('/beers/:id', (req, res) => {
  
  punkAPI
  .getBeer(req.params.id)
  .then(beersFromApi => {
    res.render('beers', { beersInfo: beersFromApi } )
  })
  .catch(error => console.log(error));
  
})

app.listen(5005, () => console.log('🏃‍ on port 5005'));
