const express = require('express');  // initialize the express instance
const hbs = require('hbs'); // initialize the hbs instance
const path = require('path'); // 
const PunkAPIWrapper = require('punkapi-javascript-wrapper'); // api taker
const { getEnabledCategories } = require('trace_events');

const app = express(); // servidor  initialize
const punkAPI = new PunkAPIWrapper(); // api future 

app.set('view engine', 'hbs');  // use the handle bar 
app.set('views', path.join(__dirname, 'views')); // will be used to the views folder

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
app.get("/beers", async (req, res) => {
  try {
    let beers = await punkAPI.getBeers()
    //console.log(beers)
    let data = {beers}  // this let the data enter as a key of objects
    res.render("beers", data)
  } 
  catch (error){
  }
})

app.get("/random-beer", async (req, res) => {
  try{
    let randombeer = await punkAPI.getRandom()
    console.log(randombeer)
    let data = {randombeer}
    res.render("random-beer", data)
  }catch (error){
  }
})

app.get('/', (req, res) => {   // to connect to route 
  res.render('index');
});


app.listen(3000, () => console.log('🏃‍ on port 3000')); // server connect
