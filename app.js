const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res, next) => res.render("index"));

app.get("/beers", (req, res, next) => {
  punkAPI.getBeers()
   .then(responseFromAPI => {
    res.render("beers", { beers: responseFromAPI }); 
   })
   .catch(error => console.log(error));
});

app.get("/random-beer", (req, res, next) => {
  punkAPI.getRandom()
  .then(responseFromAPI => {
    console.log(responseFromAPI);
    res.render("random-beer", { randomBeer: responseFromAPI } );
  })
  .catch(error => console.log(error));
});


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
