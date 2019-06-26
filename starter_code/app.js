const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("hbs", hbs);
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(beerListy => {
      console.log(beerListy[0]);

      res.render("beerList", { beerListy });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/random-beer", (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      const beerRandom = beer[0];
      res.render("random-beery", { beerRandom });
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(5500);
