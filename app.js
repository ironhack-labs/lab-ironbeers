const express = require('express');

const hbs = require('hbs');
const { get } = require('http');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials("partials_absolute_path")
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req,res,next) => {
  
  const beers = async () => {
    const listaCerAPI = await punkAPI.getBeers()
   console.log(listaCerAPI)
    res.render('beers', {
      listado25Cervezas:listaCerAPI
    })
  }
  beers() ///invoar iempre dentro del get
})

app.get("/random-beers",(req,res,next)=>{
  const rdmBeers = async() => {
    const cervRnm = await punkAPI.getRandom()
    console.log(rdmBeers)
    res.render('random-beers', {
      cervezaRandom:cervRnm
    })
  }
  rdmBeers()
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
