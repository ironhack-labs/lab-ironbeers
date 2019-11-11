const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

const beerRouter = require("./routes/beers");
app.use(beerRouter);

app.get("/", (req, res, next) => {
  res.render("index", { css: ["home"] });
});

app.listen(3000);
