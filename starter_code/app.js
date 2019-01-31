//setup
const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

hbs.registerPartials(path.join(__dirname, "/views/partials"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers);
      res.render("beers", { beers });
    })
    .catch(error => {
      console.log(
        "THERE WAS AN ERROR when trying to catch the array of 25 beers",
        error
      );
      res.send(
        "There was an error when trying to catch the array of 25 beers. Check the TERMINAL."
      );
    });
});

app.get("/randomBeer", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log(randomBeer);
      res.render("randomBeer", randomBeer[0]);
    })
    .catch(error => {
      console.log(
        "THERE WAS AN ERROR when trying to catch a random beer",
        error
      );
      res.send(
        "There was an error when trying to catch a random beer. Check the TERMINAL."
      );
    });
});

app.listen(3000);
