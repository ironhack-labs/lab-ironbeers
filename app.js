const express = require('express');
const res = require('express')
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + "/views/partials");
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
      .then(beers => {
        res.render("beers", { beers: beers })
      })
})
app.get("/random-beer", (req, res) =>{
  punkAPI
  .getRandom()
  .then(beers => {
    res.render("randomBeer", {beer: beers[0] })
    
  })
  .catch(error => console.log(error));
})

app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
