const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + "/views/components");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render("beers", { beers });
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
      res.render("oneBeer", { beer });
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
      res.render("oneBeer", { beer });
      console.log(beer)
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
