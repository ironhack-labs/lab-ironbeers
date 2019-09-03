
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');


// app.use("/",(req,res)=>res.redirect("/index"));

app.get('/', (req, res, next) => {
  res.render('index', {title: "index"});
});

app.get('/index', (req, res, next) => {
  res.redirect("/");
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log("beers successfully imported")
    console.log(beers)
    res.render('beers', {beers: beers, title: "beers"});
  })
  .catch(error => {
    console.log(error)
  })
  
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer => {
    console.log(beer)
    res.render('random-beers',{beer : beer[0], title:"random-beers"});
  })
  .catch(error => {
    console.log(error)
  })
  
});

app.listen(4000,()=>{
  console.log("server is up @ http://localhost:4000");
});
