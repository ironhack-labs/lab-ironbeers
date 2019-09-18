const express = require("express");
const app = express();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static("public"));

const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.get("/", (req, res) => {
  let data = {
    title: "Home"
  };
  res.render("home", data);
});

app.get("/beers", (req, res) => {
  let data = {
    title: "Home",
    small_content: "This is the Beers content bitch"
  };
  res.render("home", data);
});

app.get("/random-beers", (req, res) => {
  let data = {
    title: "Home",
    small_content: "This is the Random Beer content bitch"
  };
  res.render("home", data);
});

app.listen(3000, () => {
  console.log("Servidor corriendo en el pruerto 3000");
});

//coment
