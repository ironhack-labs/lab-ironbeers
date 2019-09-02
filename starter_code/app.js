const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(path.join(__dirname + "/views/partials"));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers[0]);
      res.render("beers", { beers });
    })
    .catch(err => {
      console.log("could not fetch the beers", err);
    });
});

app.get("/random-beers", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beer => {
      console.log(beer[0], "---------random");
      const aBeer = beer[0];
      res.render("randombeer", { aBeer });
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(3000);
