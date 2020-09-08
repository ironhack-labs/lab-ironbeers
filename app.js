const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, "views", "partials"))
app.get("/", (req, res) => res.render("index"))
app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi)
      res.render('beers', {
        beersFromApi
      })
    })
    .catch(error => console.log(error));
})
app.get("/beers/:id", (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then(beersFromApi => {
      res.render('beers', {
        beersFromApi
      })
    })
    .catch(error => console.log(error));
})
app.get("/randombeer", (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log('Random Beer: ', responseFromAPI)
      res.render('randombeer', {
        responseFromAPI
      })
    })
    .catch(error => console.log(error));
})
// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));