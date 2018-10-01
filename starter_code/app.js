const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.render("index");

});

app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      //res.json(beers);
      res.render("beers", { beers });
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/random-beers", (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      res.render("randomBeers", beer[0]);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(3000);
