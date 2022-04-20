const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const app = express();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname+"/views/partials")
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res,next) => {
  punkAPI.getBeers()
  .then((beers)=>{
      //console.log("beers", beers)
      res.render("beers",{beers})
  })
  .catch(error=>{
      console.log("Qué es?", error)
      res.send("Error:500")
  })
});

app.get('/random-beer',(req,res,next)=>{
  punkAPI.getRandom()
  .then(randomBeer => {
    console.log("beer", randomBeer)
    res.render("random-beer", {randomBeer: randomBeer[0]})
  })
  .catch(error => {
    console.log("Qué es?", error)
    res.send("Error:600")
  });
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
