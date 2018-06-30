
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (request, response, next) => {
  response.render('index');
});

app.get('/beers',(request,response,next)=>{
  punkAPI.getBeers()
  .then(beers => {
    console.log("estamos en el arreglo");
    response.render('beers');
  })
  .catch(error => {
    console.log(error)
  })
});


app.get('/random-beers',(request, response, next)=>{
  response.render('random-beers');
})



app.listen(3000);