const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

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

  const term = req.query.s;
  const options = term ? { 'beer_name': term } : {};

  punkAPI
    .getBeers(options)
    .then(beers => {
      res.render("beers", { beers: beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random_beer", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beer => {
      res.render("single_beer", { beer: beer[0] });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/single_beer/:beerId", (req, res, next) => {
  const id = req.params.beerId;
  punkAPI
    .getBeer(id)
    .then(beer => {
      res.render("single_beer", { beer: beer[0] });
    })
    .catch(error => {
      console.log(error);
    });
});

app.post("/search", (req, res) => {

  const nameBeer = req.body.nameBeer;
  res.redirect(`/beers/?s=${nameBeer}`);

});

app.listen(3000);
