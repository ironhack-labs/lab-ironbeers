const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("index");
});

// beers route
app.get("/beers", (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      // console.log(beers); verificar sempre antes de enviar para a view
      res.render("beers", { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

// random beer route
app.get("/randomBeers", (req, res, next) => {
  punkAPI
    .getRandom().then(beers => {
      res.render("randomBeers", { beers });
      // console.log(beers);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
