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

hbs.registerPartials(__dirname + "/views/partials")

//Bonus: Iteration 5 - Beer partial:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => res.render('beers', {beersFromApi}))
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(responseFromAPI => {console.log(responseFromAPI)
    res.render('random-beer', {responseFromAPI})})
})

app.get('/beers/beer-:id', (req, res) => {
  let beerId = req.params.id
  punkAPI.getBeer(beerId)
  .then((responseFromAPI) => res.render('random-beer', {responseFromAPI}))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));