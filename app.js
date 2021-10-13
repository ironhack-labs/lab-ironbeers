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

app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => response.render('beers', beersFromApi))
    .catch(error => console.log(error));
});
app.get('/random-beer', (request, response) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => response.render('beers', responseFromAPI))

    .catch(error => console.log(error));

});

punkAPI


app.listen(3000, () => console.log('🏃‍ on port 3000'));
