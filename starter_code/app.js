const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(__dirname + "/views/partials");

const cervezas = [
  {
    name: "Cerve",
    image: "beer.png"
  },
  {
    name: "Cerve2",
    image: "beer.png"
  },
  {
    name: "Cerve3",
    image: "beer.png"
  }
];

app.get("/", (req, res, next) => {
  res.render("index");
});


app.get("/beers", (req, res, next) => {

  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers: beers});

  })
  .catch(error => {
    console.log(error)
  })
});

app.get("/random-beers", (req, res, next) => {

  punkAPI.getRandom()
  .then(beers => {
      res.render('random-beers',{beers:beers});
  })
  .catch(error => {
    console.log(error)
  })
});


const port = 3000;
app.listen(port);
console.log(`ready on port ${port}`);
