
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res, next) => {
  res.render('index');
});

//beers
app.get('/beers', (rep, res, next) => {
  
  punkAPI.getBeers()
  .then(beers => {
    console.log("Beers")
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })
  
});

//random-beer
app.get('/random-beer', (rep, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    console.log("Random beer")
    let randomBeer =  beers[0]
    res.render("random-beer", {beer:randomBeer})
  })
  .catch(error => {
    console.log(error)
  })
});

const port = 3000
app.listen(port,()=>{
  console.log(`Ready http://localhost:${port}`)
});