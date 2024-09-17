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
// home 
app.get('/', (req, res) => {
  res.render('index');
});
// /beers
app.get("/beers", async (req, res) => {
  try {
    const selectBeer = await punkAPI.getBeers();
    console.log(selectBeer)// to check how the key value pairs are named
    res.render('beers', {selectBeer})
  } catch (error) {
    console.log(error)
  }
  
  });


// /random-beer
app.get('/random-beer', async (req, res) => { // /random-beer is our extension name 
  try {
    const randomBeer = await punkAPI.getRandom();
    console.log(randomBeer)// to check how the key value pairs are named
    res.render('randomBeer', {randomBeer}) // res rendering is sending the data to the randomBeer.hbs file 
  } catch (error) {
    console.log(error)
  }
  
  });




app.listen(3000, () => console.log('🏃‍ on port 3000'));
