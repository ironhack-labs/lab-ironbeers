const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

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
    .catch(error => {
      console.log(error);
    });
});

app.get("/beers", (req, res, next) => {
  res.render("beers");
});

app.get("/random-beers", (req, res, next) => {
  res.render("random-beers");
});

hbs.registerPartials(__dirname + "/views/partials");

app.get("/beers/:a", (req, res, next) => {
  res.render("beerCard");
});

app.listen(3000);
