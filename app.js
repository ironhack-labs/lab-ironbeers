const express = require('express')
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

hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/random-beer', async (req, res) => {
  let randomBeer = await punkAPI.getRandom()
  res.render('random-beer', {random: randomBeer[0]});
});

app.get('/beers', async (req, res) => {
  let beers = await punkAPI.getBeers()
  let arrayOfBeers = {beers: beers}
  res.render('beers', arrayOfBeers);
});

app.get('/beer/:id', async (req, res) => {
  let id = req.params.id;
  let beer = await punkAPI.getBeer(id)
  let beerObject = {random: beer[0]}
  console.log(beerObject)
  res.render('random-beer', beerObject);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
