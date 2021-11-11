const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { runInNewContext } = require('vm');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/beers", (req, res) => {
  punkAPI.getBeers()
    .then(beersFromAPI => {
      return beersFromAPI})
    .then((allBeers) => {
      const beersList = { beersKey: allBeers }
      return beersList
    })
    .then((beersObj)=>{res.render("beers", beersObj)})
    .catch(error => console.log(error));
  
});

app.get("/random-beer", (req, res) => {
  punkAPI.getRandom()
    .then(responseFromAPI => {
      return responseFromAPI})
    .then((beer) => {
        const singleBeer = { randomBeer: beer }
        return singleBeer
      })
      .then((singleBeerObj) => {
        res.render("random-beer", singleBeerObj)})      
      .catch(error => console.log(error));
});

//bonus iteration //might still need to make the link
app.get("beers/beer-:beerId", (req, res) => {
  const beerId = req.params.beerId;
  punkAPI.getBeer(beerId)
    .then(oneBeerArray => {
      const oneBerr = oneBeerArray[0];
      res.render("random-beer", {oneBeer : oneBeer})
    })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
