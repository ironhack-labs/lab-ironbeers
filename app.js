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

hbs.registerPartials(path.join(__dirname, "views/partials"));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render("beers", {beersFromApi})
  console.log(beersFromApi)
})
  .catch(error => console.log(error));
});

app.get('/random-beers', async(req, res,next) => {
  const randomBeer = await punkAPI.getRandom()
  res.render("random-beer", {beer : randomBeer[0]});
  console.log(randomBeer[0].name);

})

app.get('/beers/beer-:id', async(req, res, next) => {
  console.log(req.params.id);
  const chosenBeer = await punkAPI.getBeer(req.params.id)
  console.log(chosenBeer);
  res.render("random-beer", {beer: chosenBeer[0]})
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
