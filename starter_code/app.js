const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(__dirname + "/views/partials"); // pour récupérer les partials

app.get("/", (req, res, next) => {
  res.render("index.hbs");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      // res.json(beers); // to add the data (the beers) in the page as json data = to console.log the data in the browser instead of the terminal
      res.render("beers.hbs", { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random-beers", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beer => {
      res.render("randomBeer.hbs", { beer });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("my app started at http://localhost:3000");
});
