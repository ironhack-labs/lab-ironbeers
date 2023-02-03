const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();


app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.get("/",function(req,res){
  const beerImage = "/images/beer.png"

  res.render("index", {img: beerImage})
})
// ...

// Add the route handlers here:

app.get("/beers",function(req,res){
  punkAPI.getBeers()
    .then((allBeers) => {
      console.log('Beers from the database: ', allBeers)
      res.render('beers', {allBeers: allBeers})
    })
    .catch(error => console.log(error))
  
})

app.get("/random-beers",function(req,res){
  punkAPI.getRandom()
    .then(randomBeers => {
      console.log('Beers from the database: ', randomBeers)
    res.render("random-beers",{randomBeers: randomBeers[0]})
  }) 
  .catch(error => console.log(error))

})

app.get("/beers/:id",function(req,res){
  punkAPI.getBeer(req.params.id)
    .then(beer => {
      console.log("Beer:", beer)
    res.render("beer",{beerItem: beer[0]})
  }) 
  .catch(error => console.log(error))

})

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
