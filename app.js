const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// We're saying to the js where the partials are. 
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// Route to Beers


app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    console.log(beersFromApi)
    res.render('beers.hbs', {beersFromApi: beersFromApi});
  })
  .catch(error => console.log(error));
});

// Route to random beeers

console.log("Before entering the /random");

app.get('/random', (req, res) => {
  punkAPI.getRandom()
  .then(beersFromApi => {
    console.log("Random: ", beersFromApi)
    res.render('random.hbs', {beersFromApi: beersFromApi});
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
