const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "views"));
//app.set('views', __dirname + '/views')            // Idéntica, sin path.join()
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index"));

app.get("/beers", (req, res) => {
  const beersToShow = punkAPI
    .getBeers({ abv_gt: 8 })

    .then(beers => {})
    .catch(error => {
      console.log(error);
    });

  res.render("beers", { beersToShow });
});

// app.get("/beers", (req, res) => {
//   punkAPI
//     .getBeers()
//     .then(beers => {})
//     .catch(error => {
//       console.log(error);
//     });

//   res.render("beers", beers); // ojo! segundo argumento es objeto
// });
// app.get("/beers", (req, res) => res.render("beers"));

app.listen(3000, () => console.log("Servidor levantado"));

// const express = require("express");
// const hbs = require("hbs");
// const app = express();
// const path = require("path");
// const PunkAPIWrapper = require("punkapi-javascript-wrapper");
// const punkAPI = new PunkAPIWrapper();

// app.set("view engine", "hbs");
// app.set("views", __dirname + "/views");
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res, next) => {
//   res.render("index");
// });

// app.listen(3000);
