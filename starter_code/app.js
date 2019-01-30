const express = require("express");

const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");

const app = express();
const punkAPI = new PunkAPIWrapper();

app.use(expressLayouts);
app.set("layout", "layouts/layout");


app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("index");
});
app.get("/beers", (req, res, next) => {
  var beerArr=[];
  punkAPI.getBeers()
  .then(beers =>{
    res.render("beers",{beers:beers});
  })
  .then(()=>{
    
  })
  
  
});
app.listen(3000);
