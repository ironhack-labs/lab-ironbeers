const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials");

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const beers = await punkAPI.getBeers();
    // console.log(beers);
    res.render(`beers`, {beers})
  } catch (err) {error => console.log(error);}
});

app.get('/random-beer', async (req, res) => {
  try {
    const randomBeers = await punkAPI.getRandom();
    // console.log(randomBeers);
    res.render(`random-beer`, {randomBeers})
  } catch (err) {error => console.log(error);}
});

app.get('/beers/:beer_id', async (req, res) => {
  try {
    const idbeer = await punkAPI.getBeer(req.params.beer_id);
   // console.log(req.params.beer_id);
    //console.log(idbeer);
    res.render(`detailedbeer`, {oneBeer:idbeer[0]});
   // res.send("test")
  } catch (err) {error => console.log(error);}
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
