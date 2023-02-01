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
app.get("/", function(req, res) {
  const image ="/images/beer.png"

  res.render("index", { imageBeer: image })
})

// Add the route handlers here:
app.get("/beers", (req, res) => {
	
  const allBeers = punkAPI.getBeers()
  .then(beersFromApi => res.render("beers", { allBeers: beersFromApi }))
  .catch(error => console.log(error));
})

app.get("/random-beer", (req, res) => {
	
  const randomBeer = punkAPI.getRandom()
  .then(beerRandomFromApi => res.render("random-beer", { randomBeer: beerRandomFromApi[0] }))
  .catch(error => console.log(error));
})

app.get('/', (req, res) => {
  res.render('index');
});

hbs.registerPartials(path.join(__dirname, 'views/partials'))


app.listen(3000, () => console.log('🏃‍ on port 3000'));
