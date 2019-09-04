
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')



// Route "/" (http://localhost:3000)
app.get("/", (req, res, next) => {
  res.render("index"); // Render /views/index.hbs
});

// Route "/beers" (http://localhost:3000/beers)
app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const data = {
        beers: beersFromApi
      }
      // Render /views/beers-list.hbs
      res.render("beers", data);
    })
    .catch(error => {
      console.log(error);
      res.render('error');
    });
});

// Route "/random-beer" (http://localhost:3000/random-beer)
app.get("/random-beer", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      const data = {
        beer: beersFromApi[0]
      }
      // beersFromApi is an array with 1 element (I know it's weird)
      res.render("randomBeer", data);
    })
    .catch(error => {
      console.log(error);
      res.render('error');
    });
});

app.listen(3000, () => {
  console.log("App running on http://localhost:3000");
});
