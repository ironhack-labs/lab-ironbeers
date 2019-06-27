const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.hbs");
});

app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render("beers.hbs", { beerList: beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random-beer", (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      res.render("randomBeer.hbs", { beerObject: beer });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(5000);
