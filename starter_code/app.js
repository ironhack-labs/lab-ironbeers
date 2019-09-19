const express = require("express");
const app = express();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static("public"));

const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.get("/", (req, res) => {
  let data = {
    title: "Home"
  };
  res.render("home", data);
});

app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render("beers", { beers });
      console.log("Here begins");
      console.log(beers[0].name);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random-beers", (req, res) => {
  punkAPI
    .getRandom()
    .then(beers => {
      res.render("randombeer", { beers });
      console.log("Here begins");
      console.log(beers);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en el pruerto 3000");
});

//coment
