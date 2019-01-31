const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(__dirname + "/views/partials");

// -----ROUTE-----
app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      // res.json(beers); // to check the data
      res.locals.beers = beers;

      res.render("beer");
    })
    .catch(error => {
      console.log(error);
    });
});

// the first argument is the URL subpage
app.get("/random-beers", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      // res.json(randomBeer); // to check the data anytime we need
      res.locals.randomBeer = randomBeer;
      // the first argument refers to the name of the .hbs file that we want to send this information to
      res.render("randomBeer");
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
