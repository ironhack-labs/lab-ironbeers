const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.listen(3000, () => {
  console.log(" app is ready to roll 👍");
});
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");

//-------route

app.get("/", (request, response, next) => {
  response.render("index");
});

app.get("/beers", (request, response, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      //response.json(beers);

      response.locals.beers = beers;

      response.render("beers.hbs");
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random-beers", (request, response, next) => {
  punkAPI
    .getRandom()
    .then(beer => {
      response.render("random-beers.hbs", { beer: beer[0] });
    })
    .catch(error => {
      console.log(error);
    });
});
