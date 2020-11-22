const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');


const punkAPI = new PunkAPIWrapper();
const random = punkAPI

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => res.render('index'));
//Beers
app.get("/beers", async (req, res) => {
  const beers = await punkAPI.getBeers();
  res.render("beers", { beers });

});
// Random
app.get('/randomBeer', async(req, res) => {
  const randomBeer= await random.getRandom()
  res.render('randomBeer',{randomBeer})})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
