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

// Home route:
app.get('/', (req, res) => {
  res.render('index');
});

// Beers route:
app.get('/beers', (req, res) => { // the path can be any name
  punkAPI
  .getBeers()
  .then(beersFromApi => {console.log('Beers from the database: ', beersFromApi) 
  res.render('beers.hbs'); // the render path MUST be that of the file
})
  
  .catch(error => console.log(error));
  
});

// Random beers route
app.get('/random-beer', (req, res) => {
  res.render('random-beer.hbs');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));