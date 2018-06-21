
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
// app.set('views', __dirname);
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');


// app.get('/', (request, response, next) => {
//   response.render('index');
// });

app.get("/beers", ( request, response, next)=>{
    punkAPI.getBeers()
    .then(beers =>{
      console.log(beers[0])
      response.locals.myBeers = beers;
      response.render("beers.hbs");
})
    .catch(error =>{
      console.log(error)
});

});

app.get('/random-beer', (request, response, next) => {
  punkAPI.getRandom()
  .then(beers => {
    response.locals.myBeers = beers;
    response.render("random-beers.hbs");
})
  .catch(error =>{
  console.log(error)
});

});






app.listen(3000, ()=>{
  console.log("server started");
});
