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
app.get("/beers", (req, res) => {
  const beers = punkAPI.getBeers()
  .then(beers => res.render("beers", { title: "Beers", beers: beers }))
  .catch(error => console.log(error));
})

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log(responseFromAPI[0])
  })
  .then(responseFromAPI => {
    res.render("randomBeer", { title: "Random Beer", responseFromAPI[0] })
  })
  .catch(error => console.log(error));


  // const randomBeer = punkAPI.getRandom()
  // .then(randomBeer => console.log(randomBeer))
  // .then(randomBeer => res.render("randomBeer", { title: "Random Beer", randomBeer }))
  // .catch(error => console.log(error));

})



app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
