const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "/public")));

hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res, next) => {
  res.render("index.hbs");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render("beers.hbs", { beers });
      console.log("BEERS ARE READY", { beers });
    })
    .catch(error => {
      console.log("THERE WAS AN ERROR", error);
      response.send("There was an error. Check the TERMINAL.");
    });
});

app.get("/random-beers", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      res.render("randomBeers.hbs", { randomBeer });
      console.log("RANDOMBEERS ARE READY", { randomBeer });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);

// // ------
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
