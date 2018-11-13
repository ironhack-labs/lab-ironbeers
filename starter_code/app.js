
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {


  res.render('index');


});

app.get("/beers", (req, res, next) => {

  punkAPI.getBeers()
    .then((listOfBeers) => {
      // console.log("==================== ", listOfBeers[0])
      res.render('beers', { listOfBeers: listOfBeers})

    })
    .catch(error => {
      console.log(error)
    })


});

app.get("/random-beers", (req, res, next) => {


  punkAPI.getRandomBeer()
    .then((listOfBeers) => {
      console.log("-=-==--=-=-==--==-"+listOfBeers[0])
      res.render('random-beers', { listOfBeers: listOfBeers[Math.floor(Math.radnom)* 25] })

    })
    .catch(error => {
      console.log(error)
    })
  
});



app.listen(3000);
