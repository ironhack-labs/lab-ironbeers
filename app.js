const express = require('express');
const hbs = require('hbs');


const path = require('path');
const app = express();

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, '/views/partials'));

// Add the route handlers here:

//index
app.get('/', (req, res) => {
  res.render('index');
});

//beers
app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    res.render('beers', {arrayCervecitas: beersFromApi});
  })
  .catch(error => console.log('error'));
});

//random-beers
app.get('/random-beers', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log('Beers from the database: ', responseFromAPI)
    res.render('random-beer', {cervecita: responseFromAPI});
  })
  .catch(error => console.log('error'));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
