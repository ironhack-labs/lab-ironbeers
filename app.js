const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

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

app.get("/beers", (req, res) => {
  punkAPI
  .getBeers()
  //the .then holds the value from the promise recieved through the .get fro m the beer API
  // inside the .then method we can therefore work with the recieved data which is an array of objects such as use the res.render methode
  // to pass the date on to the beers view
  // in the res render we need to define what should be passed first parameter is the recieving page "beers"
  // handelbars needs an object as a seocnd parameter to work so we create an object with {} an object needs a key-value pair 
  // so we come up with a key in this case "beers" and use the recieved data from the API in this case the array of objects as the single value 
  // --> move to beers to see next step
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    res.render("beers", {"beers": beersFromApi})

})
  .catch(error => console.log(error));
})

app.get("/random-beer", (req,res) => {
  const randomBeer = punkAPI.getRandom()
  randomBeer.then(randomBeer => {
    console.log("randome beer from database:", randomBeer)
    res.render("random-beers",{"aRandomBeer":randomBeer})
  })
  .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
