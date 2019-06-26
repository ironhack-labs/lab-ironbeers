const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

require("dotenv").config();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      // res.json(beers);
      res.render("beers.hbs", { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random-beer", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beers => {
      res.render("random-beer", { randomBeer: beers[0] });
    })
    .catch(error => {
      console.log(error);
    });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("app started at " + process.env.SITE_URL);
});
