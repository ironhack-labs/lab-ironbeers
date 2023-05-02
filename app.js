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

hbs.registerPartials(__dirname + "/views/partials")
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/allBeers', (req, res) => {
  punkAPI.getBeers()
  .then(
    beersFromApi => {
      res.render('all-beers', {beersInfo: beersFromApi})
    }
    )
  .catch(error => console.log( error));
})

app.get('/randomBeer', (req, res) => {
  punkAPI
  .getRandom()
  .then(randomBeerFromApi => {
    console.log('random beer: ', {...randomBeerFromApi[0]}),
    res.render('random-beer', {...randomBeerFromApi[0]})// your magic happens here
  })
  .catch(error => console.log(error));
  
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
