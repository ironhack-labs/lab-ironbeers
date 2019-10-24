
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


app.get('/', (reqquest, response, next) => {
  response.render('index');
});

app.get('/beers', (request, response, next)=>{
  punkAPI.getBeers()
  .then(beers => {
    response.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })

});

app.get('/randonbeer', (request, response, next)=>{
  punkAPI
  .getRandom()
  .then(beer => {
    response.render("randonbeer", {beer});
  })
  .catch(error => {
    console.log(error);
  });
})

app.listen(3000);
