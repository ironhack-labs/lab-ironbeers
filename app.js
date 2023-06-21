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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beer_random', (req, res) => {
  console.log('it works');
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log('Random Beers from the database: ', {responseFromAPI});
      res.render('randomBeer', {responseFromAPI});
    })
    .catch(error => console.log(error));



  
});


app.get('/beer', (req, res) => {

  punkAPI
    .getBeers()
    .then(beersFromApi => {
      //console.log('Beers from the database: ', { beersFromApi });
      res.render('beer', {beersFromApi});
    })
    .catch(error => console.log(error));


  
});










app.listen(5200, () => console.log('🏃‍ on port 5200'));
