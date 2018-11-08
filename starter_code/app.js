const express = require("express");
const hbs = require("hbs");
const _ = require("lodash");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(__dirname + '/views/partials');

app.get("/", (req, res, next) => {
  let data = {
    name: "home",
    home: true
  };
  res.render("index", data);
});

app.get("/beers", (req, res, next) => {
  let data = {
    name: "beers",
    beers: true
  };
  res.render("beers", data);
});

app.get("/random-beers", (req, res, next) => {
  let data = {
    name: "randomBeer",
    randomBeer: true
  };
  res.render("random-beers", data);
});

const port = 3000;
app.listen(port,() => {
  console.log(`Ready on port ${port}`);
});
