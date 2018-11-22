const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs"); // connects hbs and express
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      //res.send(beers)
      res.render("beers", {beers})
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/randombeer", (req, res, next) => {
  res.render("randombeer");
});

hbs.registerPartials(__dirname + '/views/partials')




app.listen(3000);
