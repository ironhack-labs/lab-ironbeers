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
  const beerImage = "/images/beer.png"
  const link1 = "Check the beers!"
  const link2 = "Check a Random Beer"
  res.render('index', {image: beerImage, link1, link2});
  
});

app.get("/beers", (req, res) => {
  const beersArr = punkAPI.getBeers()
  .then(beersFromApi => res.render("beers", {beersArr: beersFromApi}))
  .catch(error => console.log(error));
  })

app.get("/random-beer", (req, res) => {
  const randomBeer = punkAPI.getRandom()
  randomBeer.then(beer => {
    res.render("random-beer", {randomBeer: beer[0]})
  })
  .catch(error => console.log(error));
})

//  punkAPI
//  .getRandom()
//  .then(beers => {
//      beers[0].random = true
//      res.render("random-beer", {beer: beers[0]})
//})

// app.get("/beer-i3f4d34s34b", (req, res) => {
//   const beerId = punkAPI.getBeers({'id': 8})
//   res.render("beer-i3f4d34s34b", beerId: beerId)
// })

hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.listen(3000, () => console.log('🏃‍ on port 3000'));
