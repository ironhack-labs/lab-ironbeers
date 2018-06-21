
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public/')));

hbs.registerPartials(__dirname + '/views/partials/');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers',(req, res, next)=>{
  punkAPI.getBeers()
  .then(beers => {
    res.locals.myBeers = beers;
    res.render('beers');
    
  })
  .catch(error => {
    console.log("didn't work", error)
  })
} )

app.get('/random-beer', (req, res, next)=>{
  punkAPI.getRandom()
  .then(beers => {
    console.log(beers[0]);
    res.locals.randomBeers= beers[0];
    res.render('randomBeers.hbs')
  })
  .catch(error => {
    console.log(error)
  })
})

// Finally, let's create our /random-beer route. Inside our route, you should call the getRandom() method 
// of the PunkAPI package, and after receiving the info, render the randomBeer.hbs file and passing the data of the beer.


app.listen(3000, () => {
  console.log("server started!");
})