const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials") //Important to remember it

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// app.get("/beers", (req, res)=>{
//   punkAPI.getBeers().then((beersFromTheAPI)=>{ //Essa parte é feita depois do que tá fora, por isso tem que ser renderizado dentro
//     try{
//       res.render("beers", {beersFromTheAPI}) //We want to render the beers always inside the promise
//     }
//     catch(e){
//       console.log(e)
//     }
//   })  
// })

app.get("/beers", async (req,res) => {
  try{
    let beersFromTheAPI = await punkAPI.getBeers()
    console.log("Here I am: ", beersFromTheAPI)
    res.render("beers", {beersFromTheAPI})
  }
  catch(e){
    console.log(e)
  }
})

app.get("/randombeer", async (req,res) => {
  try{
    let randomBeer = await punkAPI.getRandom()
    res.render("randomBeer", {randomBeer})
  }
  catch(e){
    console.log(e)
  }
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
