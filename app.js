const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const  handlebars = require('hbs');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

handlebars.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers(25)
  .then(beersFromApi => {
    res.render("beers", {beerArr: beersFromApi })
})
  .catch(error => console.log(error))
});

app.get('/random-beers', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render("random-beers", {ranBeer: responseFromAPI});
  })
  .catch(error => console.log('Error getting a random beer', error));
});

app.get('/beer/:id', (req, res) =>{
  // console.log(req.params.id);
  punkAPI
  .getBeer(req.params.id)
  .then(beersFromApi => {
    res.render("beer", {oneBeer: beersFromApi});
  })
  .catch(error => console.log('Error to accesing this beer', error))
})

app.listen(3000, () => console.log('🏃‍Running on port 3000'));