const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.listen(5555, () => console.log("IronBeers LABS"));

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res, next) => {
  res.render("index.hbs");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.locals.beerList = beers;
      res.render("beers.hbs");
    })
    .catch(error => {
      console.log("There were an error", error);
      res.send("There was an error. Check the TERMINAL.");
    });
});

app.get("/random-beer", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beers => {
      const randomIndex = Math.floor(Math.random() * beers.length);
      const infoBeer = {
        featuredBeer: beers[randomIndex]
      };
      res.render("random-beer.hbs", infoBeer);
    })
    .catch(error => {
      console.log("There were an error", error);
      res.send("There was an error. Check the TERMINAL.");
    });
});
