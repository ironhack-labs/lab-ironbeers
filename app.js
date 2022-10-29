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
hbs.registerPartials(__dirname + '/views/partials');


// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

let beers; 
let beersNameArray;
let beer1;

app.get('/beers', (req, res) => {

  beers = punkAPI.getBeers()
  .then(beer => {
    console.log('Beers from the database: ', beer)
    res.render('beers', {beer})
  })
  //beers.then( beersArray => {
  //  beersNameArray =beersArray.map(beer => beer.name)
  //  console.log(beersNameArray) 
  //})
  .catch(error => console.log(error))
  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
