const express = require("express");
const hbs = require("hbs");
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, "views/partials"));

// ...

// Add the route handlers here:

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/beers/", (req, res, next) => {
  punkAPI
    .getBeers()
    .then((beers) => {
      const data = {
        beers,
      };
      res.render("beers.hbs", data);
    })
    .catch((error) => console.log(error));
});

app.get("/random-beers", async (req, res, next) => {
  try {
    const [beer] = await punkAPI.getRandom();
    res.render("random-beer.hbs", { beer });
  } catch (err) {
    next(err);
  }
});

app.get("/beers/:id", async (req, res, next) => {
  try {
    const [beer] = await punkAPI.getBeers(req.params.id);
    res.render("random-beers", { beer });
  } catch (err) {
    next(err);
  }
});

app.get("/random-beers", async (req, res, next) => {
  try {
    const [beer] = await punkAPI.getRandom();
    res.render("random-beer", { beer });
  } catch (error) {
    next(error);
  }
});

app.listen(3000, () => console.log("🏃‍ on port 3000"));
