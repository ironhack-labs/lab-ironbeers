const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
app.use(express.static('public'));
const punkAPI = new PunkAPIWrapper();



app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
  // console.log('Beers from the database: ', beersFromApi)
  res.render('beers', { beers : beersFromApi });
  })
  .catch(error => console.log(error));
});

app.get('/randombeer', (req, res) => {
  punkAPI.getRandom().then(responseFromAPI => {
    res.render('randombeer', {randombeer : responseFromAPI});
    console.log("HELLO", responseFromAPI )
    // your magic happens here
  }).catch(error => console.log(error));

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
