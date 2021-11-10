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

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:
app.get("/home", (req, res)=>{
  res.render("index");
})
app.get("/beers", async (req, res)=>{
  try{
    
    const beers = await punkAPI.getBeers()
    res.render("beers", {beers: beers});
  }
  catch(error){
    res.send(error)
  }
})
app.get("/random-beer", async (req, res)=>{
  try{
    const random = await punkAPI.getRandom()
    console.log(random[0])
    const oneBeer = random[0]
    res.render("random-beer", oneBeer)
  }
  catch(error){
    res.send(error)
  }
})

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
