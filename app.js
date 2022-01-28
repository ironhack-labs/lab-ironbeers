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

hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res, next) => {
  console.log('index');
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => res.render('beers', {beers}))
    .catch((err) => console.log(eer))  
  
});

app.get('/randomBeer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => res.render('randomBeer', {randomBeer}))
    .catch((err) => console.log(err));

});

app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
