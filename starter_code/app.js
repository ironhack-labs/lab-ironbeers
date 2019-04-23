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
  console.log("fhdsjak");
  res.render("index");
});

app.get("/home-page", (req, res, next) => {
  res.render("index");
});

app.get("/beers-page", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers)
      res.render("beers", {beers});
    })
    .catch(error => {
      console.log(error);
    });
});

hbs.registerPartials(__dirname + '/views/partials')



app.get("/random-beer-page", (req, res, next) => {
  punkAPI.getRandom().then(beer => {
    let data = { 
        name: beer[0].name,
        image_url: beer[0].image_url,
        tagline: beer[0].tagline,
        description: beer[0].description,
        food_pairing: beer[0].food_pairing,
        brewers_tips: beer[0].brewers_tips


     
     
      };
    console.log("---------", data);

    res.render("randomBeerHbsFile", data);
  });
});

app.listen(3000);
