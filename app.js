const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then((beerList) => {
    console.log(beerList)
    res.render('beers', {beers: beerList})
  }).catch(error => {
    console.log("error in beers: ", error)
  })
  })

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom().then((responseFromAPI) => {
    res.render('random-beers', {randomBeer: responseFromApi});
  }).catch((error) => {
    console.log("error in Random beers: ", error)
  })
});




app.listen(5000, () => console.log('🏃‍ on port 5000'));
