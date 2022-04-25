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

app.get("/beers", (req, res) => {
  punkAPI.getBeers()
  .then((chelas) => {
    console.log("Beers", chelas)
    res.render('beers', { chelas })
  })
  .catch((error) => console.log("El Error es:", error))
})

app.get("/random-beer", (req, res) => {
  punkAPI.getRandom()
  .then((beer) => {
    console.log("Beer random", beer)
    res.render('random-beer', { beer })
  })
  .catch(error => console.log("El Error es:", error))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
