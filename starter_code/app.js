
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();



app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + "/partials")


app.get("/", (req, res) =>{
  res.render("index")
})

app.get("/beers", (req, res) =>{
  punkAPI.getBeers()
  .then(beers => {
    res.render("beers", {beers})
  })
  .catch(error => {
    console.log(error)
  })
})

app.get("/random-beer", (req, res) =>{
  res.render("random-beer")
})



app.listen(3000);
