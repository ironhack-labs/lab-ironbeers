const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const texts = {
    headTitle: "Beers",
    nav: ["home", "beers", "random-beers"]
}

// add the partials here:

// add the routes here:

app.get("/", (req, res) => res.render("index", texts));
app.get("/beers", (req, res) => res.render("beers", texts));
app.get("/random-beers", (req, res) => res.render("random-beers", texts));

app.listen(3000, () => console.log('🏃‍ on port 3000'));



