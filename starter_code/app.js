
const express = require('express');
// const hbs     = require('hbs');
const app     = express();
// const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// app.set('view engine', 'hbs');
// app.set('views', __dirname + '/views');
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));

// Main
app.get('/', (req, res) => {
  res.render('index');
});

// Beers
app.get("/beers", (req, res) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render("beers", { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

// Random beer
app.get("/random-beers", (req, res) => {
  punkAPI.getRandom()
    .then(beers => {
      res.render("random-beer", { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
