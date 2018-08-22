const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "./public")));
hbs.registerPartials(path.join(__dirname, './views/partials'))


app.get("/", (req, res, next) => {
  res.render("index", { title: "HOMEPAGE" });
});
app.get("/beer", (req, res, next) => {
  // const beer1 = punkAPI.getBeer();
  // console.log(beer1);
  punkAPI
    .getBeers()
    .then(beers => {
console.log(beers)
res.render("beer", { beers, title: "Beer List" });

    })
    .catch(error => {
      console.log(error);
    });
});


app.get("/random", (req, res, next) => {
  const randomBeer = PunkAPI.getRandom();
  randomBeer.then(beer => {
    alert(beer[0].name);
  });
  res.render("random", { title: "Random Beers" });
});

app.listen(3000);
