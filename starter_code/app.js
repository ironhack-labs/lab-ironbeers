const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(path.join(__dirname, "./views/partials"));

app.get("/", (req, res, next) => {
  res.render("index");
});
app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render("beers", { beers });
    })
    .catch(console.error);
});

app.get("/random-beer", (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      const randomNumb = getRandomNumber(beers.length);
      res.render("randomBeer", {
        beer: beers[randomNumb]
      });
    })
    .catch(console.error);
});

app.listen(3000);

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
