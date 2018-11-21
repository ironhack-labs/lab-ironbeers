
const express = require('express');
const hbs     = require('hbs');
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app     = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers =>{
    console.log(beers)
    res.render('index', {beers});
  })
  .catch(err => {
    console.log("err")
  })
  
});

app.get("/beers", (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render("beers",{beers})
  })

  .catch(err => {
    console.log(err)
  })
  
  
})

app.get("/randombeer", (req, res) => {
  punkAPI.getRandom()
 .then(beer => {
   res.render("random", {beer})
 })

 .catch(err => {
   console.log(err)
 })
  
  
})

app.listen(3002, ()=> {
  console.log("Es 3002");
})

