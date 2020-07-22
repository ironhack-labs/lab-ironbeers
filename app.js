const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
const randomBeers = punkAPI.getRandom()

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get("/", (req, res, next) => {
  res.render("index");
});


app.get("/beers", (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render("beers", {
      beers
    });
  })
  .catch(error => console.log(error))
  });



  app.get("/randomBeers", (req, res,) => {
  punkAPI.getRandom()
  .then(responseFromAPI => {
    // your magic happens here
    console.log(responseFromAPI)
    res.render("randomBeers", {randomBeer: responseFromAPI[0]});
    })
  .catch(error => console.log(error));
  });


app.listen(3000, () => console.log('🏃‍ on port 3000'));
