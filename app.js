const { response } = require('express');
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

app.get("/", function (req, response, next) {
  response.render("index")
});

app.get("/beers", function (req, response, next) {
  punkAPI
  .getBeers()
  .then((beersFromApi) => response.render("beers", {beerlist: beersFromApi}))
  .catch(error => console.log(error))

});



app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      res.render("random-beer", { random: beersFromApi })
    })
  .catch(error => console.log(error));
})


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then((result) => {
    console.log(result[0])
    res.render('beers', result)
  })
  .catch()
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
