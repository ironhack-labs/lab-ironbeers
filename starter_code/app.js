
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



app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (req,res,next) => {
  // method from punkAPI
  punkAPI.getBeers()
  // response from database 'beers' placeholder
  .then(beers => { // ====> this holds success callback
  // rendering the data to page with {beers} object
  // console.log("Response from DB: " beers);
  res.render('beers', {beers});    
  })
  .catch(error => { // =====> holds error callback
    console.log(error)
  })
});


app.get('/random-beer', (req,res,next) => {
  // getRandom is method from punkAPI
  punkAPI.getRandom()
  
  .then(beers => {
// rendering object to page
// beer variable 
    res.render('random-beers', {beer:beers[0]})
  })
  .catch(error => {
    console.log(error)
  })

})
app.listen(3000);
