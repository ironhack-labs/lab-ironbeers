const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

const beerRouter = require("./routes/beers");
app.use(beerRouter);

app.get("/", (req, res, next) => {
  res.render("index", { css: ["styles"] });
});
app.get("/beers", (req, res, next) => {
  res.render("/beers");
});
app.get("/random-beers", (req, res, next) => {
  res.render("/random-beers");
});
hbs.registerPartials(__dirname + "/views/partials");

app.listen(3000);
