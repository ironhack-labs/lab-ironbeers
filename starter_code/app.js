
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials')

const randomBeer = punkAPI.getRandom()

app.get('/', (req, res, next) => {
  let data = {
    title:"HomePage"
  }
  res.render('index',data);
});

app.get('/beers', (req, res, next) => {

punkAPI.getBeers()
.then(beers => {
  res.render('beers',{beers});
  console.log(beers)
})
.catch(error => {
  console.log(error)
})
  
});

app.get('/random',(req,res,next)=>{
  punkAPI.getRandom()
  .then(randbeers => {
res.render('random',randbeers[0]);
  })
  .catch(error => {
    console.log(error)
  })
})


app.listen(8080);
