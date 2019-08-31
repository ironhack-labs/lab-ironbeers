const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

//set my view engine to hbs
app.set("view engine", "hbs");
//declare where to find views
app.set("views", __dirname + "/views");

//register partial views
hbs.registerPartials(__dirname + "/partials");

//serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render("beers", { beers: beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random_beer", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      let random_beer = beers[Math.floor(Math.random() * beers.length)];
      res.render("random_beer", { randomBeer: random_beer });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/single_beer", (req, res, next) => {
  const id = req.query.id;
  punkAPI
    .getBeers()
    .then(beers => {
      debugger;
      const single_beer = beers.find(beer => beer.id == id);
      res.render("single_beer", { singleBeer: single_beer });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
