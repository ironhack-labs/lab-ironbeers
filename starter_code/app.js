
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

//set my view engine to hbs
app.set('view engine', 'hbs');
//declare where to find views
app.set('views', __dirname + '/views');
//register partial views
hbs.registerPartials(__dirname + "/partials");
//serve static files
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index',{title:"home page"});
});
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers',{ beers, title: "beer page" });
  })
  .catch(error => {
    console.log(error);
  })
});
app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(randBeer => {
    res.render('random-beer',{randBeer,title: "random-beer page" });
  })
  .catch(error => {
    console.log(error);
  })
});

app.listen(3000,()=>{
  console.log("running on port 3000");
});