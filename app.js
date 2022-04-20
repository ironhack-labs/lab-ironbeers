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
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req, res)=>{
  punkAPI.getBeers()
  .then((beersFromApi)=>{
    //console.log("Beers from the database: ", beersFromApi)
    res.render("beers",{beersFromApi})
  })
  .catch((error)=>{
    res.send("Error")
  })
  
})

app.get("/random-beer", (req, res)=>{
  punkAPI.getRandom()
  .then((responseFromAPI )=>{
    //console.log("Random beer", responseFromAPI[0])
    res.render("random-beer",responseFromAPI[0])
  })
  .catch(()=>{

  })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
