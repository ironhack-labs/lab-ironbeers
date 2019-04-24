const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
    app.get("/", (req, res, next) => {
 let data = {
   image: "./images/beer.png"
   };
 res.render("index", data);
});

app.get("/beers", (req, res, next) => {
 let data = {};
 punkAPI
   .getBeers()
   .then(beers => {
     res.render("beers", { beers });
   })
   .catch(error => {
     console.log(error);
   });
});

app.get("/random-beer", (req, res, next) => {
 let data = {};
 punkAPI
   .getRandom()
   .then(beer => {
     res.render("randomBeer", { beer });
   })
   .catch(error => {
     console.log(error);
   });
});
app.listen(3000);