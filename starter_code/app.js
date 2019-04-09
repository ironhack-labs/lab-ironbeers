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

app.get(["/","/home"], (req, res, next) => {
  const data = {
    test: "yoyoyo"
  };
  res.render("index", data);
});

app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(beersRes => {
      res.render("beers", { beersRes });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random-beer", (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {

      res.render("random-beer", {randomBeer});
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
