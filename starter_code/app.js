//first 2 lines always need to be there for express
const express = require('express');
const app     = express();
//allows to use hbs
const hbs     = require('hbs');
//path require without a ./ in front of it, its a package and he is giving a little nickname to the package
const path    = require('path');
//gives a name to punk api package
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
//create a new instance of the package(it gives us a constructor function)
const punkAPI = new PunkAPIWrapper();

//we are going to use hbs instead of html
app.set('view engine', 'hbs');

//allows you to not have to type in /views, assumes your files are in .views
app.set('views', __dirname + '/views');
//any static assets are in public, dont need to type public.  front end js, css, and imgs.
app.use(express.static(path.join(__dirname, 'public')));
//tells the app where the partials will be.
hbs.registerPartials(__dirname + '/views/partials');

punkAPI.getBeers()
.then(beers=>{

})
.catch(error => {
  console.log(error)
})

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next)=> {
  punkAPI.getBeers()
  .then(beers => {
    //console.log(beers);
      res.render('beers', {beersArray:beers});
})

  });


app.get('/randomBeer', (req, res, next)=>{
  punkAPI.getRandom()
  .then(beers => {

  res.render('randomBeer', {theBeer:beers[0]});
    
})
});
app.listen(3000);