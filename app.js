// 1. IMPORTACIONES
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


// 2. MIDDLEWARES
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials")





// 3.- RUTAS
// Add the route handlers here:
app.get('/', (req, res) => { // HOME
  res.render('index');
});


app.get("/beers", (req, res) => { // BEERS

  const listBeers = punkAPI.getBeers()

  listBeers
  .then((beers) => {
      res.render("beers", {
          beersFromApi:beers
      })
  })
  .catch((error) => {
      console.log(error)// manda el mensaje de error
  })
})

app.get("/randombeer", (req, res) => {
  const randomBeers = punkAPI.getRandom()
  randomBeers
  .then((beers)=>{
      res.render("randombeer",{
          data:beers 
      })
  })
})








// 4.- SERVIDOR
app.listen(3000, () => console.log('🏃‍ on port 3000'));
