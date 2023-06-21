const { BADHINTS } = require("dns");
const express = require("express");

const hbs = require("hbs");
const { dirname } = require("path");
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Add the route handlers here:

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/beers", (req, res) => {
  punkAPI
    // Calls the getBeers() method of the PunkAPI to fetch the beers.
    .getBeers()

    // The response (beers) is passed as a parameter to the callback function.
    .then((beersFromApi) => {
      // Renders the view file called "beers" and passes the obtained beers as data to that view.
      res.render("beers", { beers: beersFromApi });
    })
    .catch((error) => {
      console.log(error);
      res.render("error");
    });
});

app.get("/random-beer", (req, res) => {
  punkAPI
    // Calls the getRandom() method of the PunkAPI to fetch
    .getRandom()

    .then((responseFromAPI) => {
      let beer = responseFromAPI[0];
      res.render("random-beer", { beer });
    })
    .catch((error) => {
      console.log(error);
      res.render("error");
    });
});



app.listen(3002, () => console.log("🏃‍ on port 3002"));
