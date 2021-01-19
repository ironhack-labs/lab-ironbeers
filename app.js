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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    res.render('beers', {arrayCervecitas: beersFromApi});
  })
  .catch(error => console.log('error'));
});

app.get('/random-beers', (req, res) => {
  res.render('random-beer');
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
