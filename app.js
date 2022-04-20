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

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then((beersFromApi)=>{
    console.log(beersFromApi);
    res.render('beers', {beersArr : beersFromApi})
  })
  .catch((error)=> console.log(error));
});

app.listen(3001, () => console.log('🏃‍ on port 3000'));

app.get('/random-beer', (req, res) => {

  punkAPI
  .getRandom()
  .then((randomBeerFromApi)=>{
    console.log(randomBeerFromApi);
    res.render('random-beer', randomBeerFromApi[0])
  })
  .catch((error)=> console.log(error));
});
