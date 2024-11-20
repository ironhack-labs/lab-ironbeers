const express = require('express');
const { get } = require('express/lib/response');

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

app.get('/Beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { beers: beersFromApi }))
    .catch(error => console.log(error));


})

app.get('/randomBeer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => res.render('randomBeer', { randombeer: responseFromAPI })

    )
    .catch(error => console.log(error));
  //res.render('randomBeer')
})

app.listen(5005, () => console.log('🏃‍ on port 5005'));
