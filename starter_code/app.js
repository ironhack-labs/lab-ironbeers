const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers=>{
    res.render('index', {beers});
  })
  .catch(err=>{
    console.log(err)
  })
  
});

app.get('/beers', (request, response)=>{
  punkAPI.getBeers()
  .then(beers=>{
    response.render('beers', {beers});
  })
  .catch(err=>{
    console.log(err)
  })
})

app.get('/randombeer', (request, response)=>{
  punkAPI.getRandom()
  .then(beer =>{
    response.render('random', {beer})
  })
  .catch(err =>{
    console.log(err)
  })
})

app.listen(8080, ()=>{
  console.log('Listening in 3000')
})

app.listen(3000);