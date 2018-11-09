const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use("/favicon.ico", express.static('public/img/beer.ico'));
hbs.registerPartials(__dirname + '/views/partials');

app.get("/", (req, res, next) => {
  let data = {
    name: "home",
    home: true
  };
  res.render("index",{
    data
  });
});

app.get("/beers", (req, res, next) => {
  let data = {
    name: "beers",
    allBeers: true
  };
  punkAPI.getBeers()
  .then(beers => {
    res.render("beers", {
      data,
      beers
    });
  })
  .catch(error => {
    console.log(error)
  })
});

app.get("/random-beers", (req, res, next) => {
  let data = {
    name: "randomBeer",
    randomBeer: true
  };
  punkAPI.getRandom()
  .then(beers => {
    res.render("random-beers", {
      data,
      beer: beers[0]
    });
  })
  .catch(error => {
    console.log(error)
  })
});

const port = 3000;
app.listen(port,() => {
  console.log(`Ready on port ${port}`);
});
