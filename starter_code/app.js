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
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(punkAPIBeers => {
      //console.log("BEERS -->", beers);
      let data = {
        beersForView: punkAPIBeers
      };
      res.render("beers", data); //renders views/beers.hbs
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("Server is listening on 3000");
});
