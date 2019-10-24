const express = require("express");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

const ejs = require("ejs");
const lru = require("lru-cache");
ejs.cache = lru(200);

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(require("express-ejs-layouts"));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render("beers", { i: 0, beers: beers });
      console.log(beers);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/beer/:id", (req, res, next) => {
  const id = req.params.id
  punkAPI
    .getBeer(id)
    .then(beer => {
      res.render("oneBeer", { beer: beer[0] });
      console.log(beer);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/randome-beers", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beer => {
      res.render("oneBeer", { beer: beer[0] });
      console.log(beer)
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
