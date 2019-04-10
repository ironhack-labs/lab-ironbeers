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

app.get("/", (req, res, next) => {
  res.render("index");
});
app.get("/beer", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beer => {
      console.log(beer);
      res.locals.beerList = beer;
      res.render("beer");
    })
    .catch(error => {
      console.log(error);
    });
});
app.get("/random-beer", (req, res, next) => {
  punkAPI
    .getRandom()
    .getBeers()
    .then(beer => {
      res.render("randomBeer", { beer: beer[0] });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
