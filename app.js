
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.set("layout", __dirname + "/views/layout.hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get("/beers", (req, res, next) => {
  // const index = Math.floor(Math.random()*25);
  // NOT SURE---------------
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers)
    const chosBeer = beers;
    res.render("beers.hbs", {chosBeer});
  })
  .catch(error => {
    console.log(error)
  })
});

app.get("/random-beers", (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    const chosBeer2 = beers[0];
    console.log(chosBeer2)

    res.render("random-beers.hbs", {chosBeer2});
  })
  .catch(error => {
    console.log(error)
  })
  
});

app.listen(3000, ()=>{
  console.log("Server Running!");
});