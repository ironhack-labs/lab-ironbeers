// SETUP

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

//ROUTES

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      // res.json(beers);
      res.locals.beersList = beers;
      res.render("beers.hbs");
    })
    .catch(error => {
      console.log(error);
    });
});




app.get("/random-beers", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beers => {
      res.locals.beersList = beers;
      res.render("random-beers.hbs");
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("App is ready!");
});

//=============================
//Nizar's code

// app.get("/ADDRESS", (request, response, next) => {
//   getDataFromAnApi()
//     .then(apiResult => {
//       // don't forget to send the apiResult to the HBS
//       response.render("SOME_VIEW.hbs");
//     })
//     .catch(error => {
//       console.log("THERE WAS AN ERROR", error);
//       response.send("There was an error. Check the TERMINAL.");
//     });
// });