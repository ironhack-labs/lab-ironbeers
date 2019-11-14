
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

//promesa de beers//

app.get("/beers", (req, res) => {
  
  // aqui esta el metodo de la API PunkApi//
  punkAPI.getBeers()
  .then(beers => {
    res.render("beers", {beers});
  })
  .catch(error => {
    console.log(error)
  })
});

//promesa de randomBeers//

app.get("/randomBeers", (req, res) => {
  
  // aqui esta el metodo de la API PunkApi//
  punkAPI.getRandom()
  .then(beers => {
    console.log(beers)
    res.render("randomBeers", ...beers);
    console.log('<<<<<<<<<',beers)

  })
  .catch(error => {
    console.log(error)
  })
});

// alta del partial de beer
hbs.registerPartials(__dirname + '/views/partials')

app.listen(3000, () =>{
  console.log('prendido');
});

