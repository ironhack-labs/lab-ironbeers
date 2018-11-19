
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


// ================ MiddleWare ====================

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));

//  ===============================================


app.get('/', (req, res, next) => {
  res.render('index');
});


// =====ROUTE TO GET ALL BEERS============

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(theListOfBeers => {
    // console.log("===============", theListOfBeers)
    res.render('beers', {beers: theListOfBeers})
  })
  .catch(error => {
    console.log(error)
  })

})


//======ROUTE TO GET SINGLE RANDOM BEER


  
app.get('/randombeer', (req, res, next) =>{
    punkAPI.getRandom()
    .then(theRandomBeer => {


      res.render('randombeer', {oneBeer: theRandomBeer})
    })
    
    .catch((err) => {
      next(err)
      console.log(err);
    })
  })
    
  







app.listen(3000);

// punkAPI.getBeers()
// .then((listOfBeers)=>{
//   // console.log("the beers list ------ ", listOfBeers);
//   res.render('beers', {listOfBeers: listOfBeers})

// })