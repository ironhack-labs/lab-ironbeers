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

app.get("/", (req, res, next) => {
  res.render("index.hbs");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      // Objet array alors accollade
      res.render("beers.hbs", { beers });
      console.log(beers);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random-beers", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beers => {
      // Objet array alors accollade
      res.render("random-beers.hbs", { beers: beers[0] });
      console.log(beers);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("Our express is ready ");
});
