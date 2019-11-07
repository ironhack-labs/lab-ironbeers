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

app.get("/", (req, res, next) => {
  res.render("index.hbs");
});

app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers);
      res.render("beers.hbs", { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random-beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      let rnd = Math.floor(Math.random()*beers.length);
      let rndBeer = beers[rnd];
      console.log(beers[rnd]);
      res.render("random-beers.hbs",  rndBeer );
      // res.render("beers.hbs", { beers });
    })
    .catch(error => {
      console.log(error);
    });
});
app.listen(3001);
