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
hbs.registerPartials(path.join(__dirname, '/views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    // a promise , then render the page, storing in a variable
    .then(beersFromApi => res.render('beers', { beersFromApi }))
    // then catch always, next makes there be a page for errors and will be added later
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    // a promise to render page (in the lab notes, they call getRandomBeer - responseFromApi)
    .then(getRandomBeer => res.render('randombeer', { getRandomBeer }))
    //  catch for error handling
    .catch(error => console.log(error));
});

// app.get('/more-info', (req, res) => {
//   punkAPI
//     .getBeer()
//     .then(getMoreInfo => res.render('moreinfo', { getMoreInfo }))
//     .catch(error => console.log(error));
// });

app.get('/beers/:id', (req, res) => {
  res.send(req.params);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
