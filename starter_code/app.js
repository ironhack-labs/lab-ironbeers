const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.use(express.static(path.join(__dirname, "public")));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.set("layout", __dirname + "/views/layout.hbs");
hbs.registerPartials(__dirname + "/views/partials");

//home page route
app.get("/", (req, res, next) => {
  res.render("index.hbs");
});

//route beer
app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.locals.beers = beers;
      res.render("beers.hbs");
    })
    .catch(error => {
      console.log(error);
    });
});

//random beer route
app.get("/random-beers", (req, res, next) => {
  res.render("random-beers.hbs");
  console.log("random beer route is working");
});

app.listen(3000, () => {
  console.log("server online !");
});
