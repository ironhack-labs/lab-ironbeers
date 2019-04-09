const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");

app.set("views", __dirname + "/views");

app.use(express.static(path.join(__dirname + "/public")));

hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/beers", (request, response) => {
  punkAPI
    .getBeers()
    .then(beers => {
      //  to add the data (the beers) in the page as json data = to console.log the data in the browser instead of the terminal
      response.render("beers", { beers });
    })

    .catch(error => {
      response.render("beers");
      console.error(error);
    });

  // response.sendFile(`${__dirname}/views/beers.hbs`);
  // render and sendFile is same but render is generating before the file that you send
});

app.get("/random-beer", (request, response) => {
  punkAPI
    .getRandom()
    .then(beer => {
      response.render("random-beer", { beer });
    })
    .catch(error => {
      console.error(error);
    });

  // response.sendFile(`${__dirname}/views/random-beer.hbs`);
});

app.listen(3000, function() {
  console.log("app listening at port http://localhost:3000");
});
