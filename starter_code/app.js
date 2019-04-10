require('dotenv').config();

const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(__dirname + '/views/partials');


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// punkAPI.getBeers()
// .then(beers => {
//   res.render(beers);
// })
// .catch(error => {
//   console.log(error)
// })



app.get('/', (req, res, next) => {
  res.render("index");
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
.then(beers => {
  res.render("beers", {beers});
})
.catch(error => {
  console.log(error)
})
});

app.get('/randomBeer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    console.log(beers)
    res.render("randomBeer", {beers});
    

  })
  .catch(error => {
    console.log(error)
  })
});



app.listen(process.env.PORT, ()=>{
  console.log("Listening on port " + process.env.PORT)
});
