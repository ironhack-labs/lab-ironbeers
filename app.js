const express = require('express'); // requerir express

const hbs = require('hbs'); //requerir hbs
const path = require('path');  // crea paths
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express(); //instanciar applicacion de express
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
punkAPI.getRandom().then(elm => console.log(elm))
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials") //registrar parciales
// ...

// Add the route handlers here:

app.get("/",(req,res)=>res.render("index.hbs"))


  app.get("/Beers",(req,res)=>{
   punkAPI.getBeers()
  .then(beersFromApi => res.render('beers',{beersFromApi}))
  .catch(error => console.log(error))
  })


  app.get("/Random-Beers",(req,res)=>{
    
    punkAPI.getRandom()
  .then(beersFromApi => res.render('random-beers',{beersFromApi}))
  .catch(error => console.log(error))
  })
  
  app.get("/beers/:id", (req,res) => {

    punkAPI.getBeer(req.param.id)
    .then(beersFromApi => res.render('random-beers',{beersFromApi}))
    .catch(error => console.log(error))
  })

app.listen(3000, () => console.log('🏃‍ on port 3000')); // servidor en 3000


