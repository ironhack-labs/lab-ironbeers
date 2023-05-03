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

// Beer Route

app.get("/beers", async (req, res) => {
  try {
    const selectBeer = await punkAPI.getBeers();
    console.log(selectBeer);
    res.render('beers', {selectBeer})
  } catch (error) {
    console.log(error)
  }
})

// Random Beer Route

app.get("/random-beer", async (req, res) => {
  try {
    const selectRandomBeer = await punkAPI.getRandom();
    console.log(selectRandomBeer);
    res.render('random-beer', {selectRandomBeer})
  } catch (error) {
    console.log(error)
  }
  })


app.listen(3000, () => console.log('🏃‍ on port 3000'));
