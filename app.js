const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { callbackify } = require('util');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


// beers route

app.get('/beers', (req, res) => {
  
  punkAPI.getBeers()
  .then((beers) => {
    res.render("beers", {items: beers})
    // console.log(beers)
  })
  .catch((err)=> (console.error(err)))
})

// random beer route

app.get('/random-beer', (req, res) => {

  punkAPI.getRandom()
  .then((randomBeer) => {
    res.render("random-beer", {item: randomBeer})
    // console.log(randomBeer);
  })
  .catch(err => console.error(err))
})

// details



app.get('/:id', (req, res) => {

  punkAPI.getBeer(req.params.id)
  .then((beer) => {
    res.render("details", {details: beer})
    // console.log(randomBeer);
  })
  .catch(err => console.error(err))
})


app.listen(3500, () => console.log('🏃‍ on port 3500'));


