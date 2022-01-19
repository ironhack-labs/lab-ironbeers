const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res, next) => res.render("index"));



app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
      .then(beers => {
        console.log("beers")
        res.render("beers", { beers: beers })
      })
});

hbs.registerPartials(__dirname + '/views/partials');


app.get("/randomBeer", (req, res) => {
  punkAPI.getRandom().then(randomBeer => {
    res.render("randomBeer", { randomBeer: randomBeer });
  }).catch(error => console.log(error))
});

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
