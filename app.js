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
  res.render('index');
});
app.get('/beer', (req, res) => {});
app.get('/random-beer', (req, res) => {});


//beers
app.get('/beers', async (req,res) => {
  const beerFromApi = await punkAPI.getBeers();
  res.render('beers', {beers: beerFromApi})
})
 
//Random Beer
app.get('/random-beer', async (req,res) => {
  const beerArr = await punkAPI.getRandom();
  console.log(beerArr)
  res.render('randombeer', {beer: beerArr[0]})
})
//GEt beer
app.get('/beers/beer-:beerId', (req,res) => {
  console.log('req.params.beerId',req.params.beerId)
  const beerId = req.params.beerId;
})




app.listen(3000, () => console.log('🏃‍ on port 3000'));
