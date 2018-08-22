const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(path.join(__dirname, "./views/partials"));

app.get("/", (req, res, next) => {
    res.render("index", {
        title: "Ironbeers"
    });
});

app.get("/beers", (req, res, next) => {
    punkAPI
        .getBeers()
        .then(beers => {
            res.render("beers", {
                beers,
                title: "Beers",
                homeActive: true
            });
        })
        .catch(error => {
            console.log(error);
        });
});

app.get("/randombeers", (req, res, next) => {
    punkAPI
        .getRandom()
        .then(beers => {
            res.render("randombeers", {
                beers,
                title: "Random Beers"
            });
        })
        .catch(error => {
            console.log(error);
        });
});

app.listen(3000);
