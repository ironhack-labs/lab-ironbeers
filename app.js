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

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  const allBeersArr = punkAPI.getBeers()


  allBeersArr 
    .then(beers => {
      // console.log(beers)
      res.render('beers', {beers})
    })
    .catch(error => console.log(error))
})

app.get('/random-beer', (req, res) => {

  const randomBeer = punkAPI.getRandom()

  randomBeer
    .then(randomBeer => res.render('random-beer', {randomBeer}))
    .catch(error => console.log(error))
})

app.get('/clicked-beer/:id', (req, res) => {
  const urlId = req.params.id
  const beerId = punkAPI.getBeer(urlId)

  beerId
    .then(beer => res.render('clickedBeer', {beer}))
    .catch(error => console.log(error))

})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
