const { response } = require('express');
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
hbs.registerPartials(path.join(__dirname, "views/partials"));

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {  
  punkAPI
   .getBeers({'abv_lt':25})
   .then((beersFromApi)=>{
    return beersFromApi;
   })
   .then((beersFromApi)=>{
    //const data = beers.slice();
    res.render("beers", { beersInfo: beersFromApi });
   })
   .catch((error) => console.log(error));
});


app.get('/random-beer', (req, res) => {
  punkAPI
   .getRandom()
   .then((beerFromApi)=>{
     return beerFromApi;
   })
   .then((beerFromApi)=>{
     //console.log(beerFromApi);
     res.render("randomBeer", {randomBeerData: beerFromApi});
   })
   .catch((error) => console.log(error));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
