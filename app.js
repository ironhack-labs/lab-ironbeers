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
  res.render('index.hbs');
});


app.get('/beers/:id', (req, res) => {
  const { id } = req.params;
  punkAPI.getBeer(id)
    .then(theBeer => {
      console.log(theBeer)
      res.render('single-beer.hbs', {beer: theBeer});
    })
})

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(tonOfBeers => {
    res.render('beers.hbs', {beer: tonOfBeers})
  })
  .catch(error => console.log(error))
})



app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
    .then(randomBeer => {
      res.render('random-beers.hbs', {beer: randomBeer});
    })
})

app.listen(3005, () => console.log('🏃‍ on port 3005'));
