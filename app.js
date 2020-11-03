const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');


app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then((response)=> {
    console.log('Beers from list: ', response);
    res.render('beers', {beers: response}); //nao esquecer passar para array
  })
  .catch((error) => {
    console.log('error');
  })
}); 

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
  .then((response)=> {
    console.log('Random beers from list: ', response);
    res.render('random-beers', {randombeers: response[0]}); //nao esquecer passar para array
  })
  .catch((error) => {
    console.log('error');
  })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
