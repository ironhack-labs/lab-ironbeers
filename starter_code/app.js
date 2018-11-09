const express = require("express");
const hbs = require("hbs");
const _ = require("lodash");

//instancia del servidor de express
const app = express();

const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

//Configuraciones de express
hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beer => {
      const data = {
        beers: beer
      };
      res.render("beers", data);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random-beers", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(ranbeer => {
      const data = {
        randomBeer: ranbeer
      };
      res.render("random-beers", data);

    })
    .catch(error => {
      console.log(error);
    });
});

//escucha port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Ready on port ${port}`);
});
