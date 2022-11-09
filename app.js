const express = require('express');

const hbs = require('hbs');
const path = require('path');
const { ppid } = require('process');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get("/", (req, res, next) => res.render("index"));

app.get("/beers", (req, res, next) => {
  let beers = punkAPI.getBeers();
  beers.then(beers => {
    let x = beers.slice(0, 25);
    
    res.render("beers", {x});
  }).catch(error => console.log(error));
})

app.get("/random-beer", (req, res, next) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer.then(randomBeer => {
    let a = randomBeer;
    console.log(randomBeer);
    res.render("random-beer", {a});
  }).catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
