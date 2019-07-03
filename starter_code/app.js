
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/beers',(req,res,next)=>{
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers);
    res.render('beers',{theBeers: beers});
  })
  .catch(error => {
    console.log(error)
  })
})
app.get('/random-beers',(req,res,next)=>{
  punkAPI.getRandom()
  .then(beer => {
    console.log(beer);
    res.render("random-beers",{beer: beer[0]});
  })
  .catch(error => {
    console.log(error)
  })
})
app.get('/', (req, res, next) => {
  res.render('index');
});



app.listen(3000);
