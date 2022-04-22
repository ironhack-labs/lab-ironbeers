const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials")
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  const data = {
    imagen : "images/beer.png",
    boton1 : "Check the Beers!",
    boton2 : "Check a Random Beer"
  }
  res.render('index', data);
});
app.get("/Beers",(req,res)=>{
  punkAPI
  .getBeers()
  .then(beers=>{
    const Beers = beers
    res.render("beers", {Beers})
  })
  .catch(error => console.log(error));
  
})

app.get("/views/random-beer.hbs",(req,res)=>{
  punkAPI
  .getRandom()
  .then(beer=>{
    const Beer = beer
    res.render("random",{Beer})
  })
  .catch(error=>console.log(error))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));