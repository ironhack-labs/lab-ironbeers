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

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers",(req,res)=>{
  
  punkAPI.getBeers()
  .then((beers)=> {
    console.log('beers', beers)
    
    res.render("beers",{beers})
    console.log("que hay aqui")
  })
  .catch(error =>console.log('what is it?', error))
})

app.get("/random-beer",(req,res)=>{

  const randomBeer = punkAPI.getRandom()
  randomBeer.then((beer)=>{
    

   console.log('beer',beer)
   res.render("random-beer",{beer})
   console.log("Que se imprime")

  })

})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
