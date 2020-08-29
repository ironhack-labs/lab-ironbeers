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
hbs.registerPartials(path.join(__dirname, 'views/partials'))
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
//route for the beers page
app.get('/beers', (req, res) => {
  //create an object which we are going to use
  const beerObj = punkAPI.getBeers()
  //after getting all bears - let's show them on the page
  beerObj
    .then(beers => {
      //render the page only when we have content for it
      res.render('beers', {beers})
    })
    .catch(error => {
      console.log(error)
    })
})
app.get('/random-beer', (req, res) => {
  const randomBeerObj = punkAPI.getRandom()
  randomBeerObj
    .then(randBeer => {
      console.log(randBeer)
      res.render('random-beer', {randBeer})
    })
    .catch(error => {
      console.log(error)
    })
})
app.get('/one-beer/:id', (req, res) => {
  const beerId = req.params.id
 // console.log(beerId)
 // const beerById = punkAPI.getBeer(beerId)
  punkAPI.getBeer(beerId)
    .then(oneBeer => {
     // console.log(oneBeer)
      res.render('one-beer', {oneBeer})
    })
    .catch(error => {
      console.log(error)
    })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
