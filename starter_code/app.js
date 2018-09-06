
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
  res.render('');
});

// app.get('/home', (request, response, next) => {
//   response.sendFile(__dirname + '/views/home.html')
// });


app.get('/beers', (request, response, next) => {


punkAPI.getBeers()
.then(daBeers => {
     console.log(daBeers)
     response.render('beers', {theList:daBeers });
})
.catch(error => {
console.log(error)
})



  // response.sendFile(__dirname + '/views/beers.html')
  
});

app.get('/random', (request, response, next) => {

  punkAPI.getBeers()
  .then(randomB => {
       console.log(daBeers)
       response.render('random', {theRandom:randomB[0] });
  })
  .catch(error => {
  console.log(error)
  })

  response.render('randomBeer');
});



app.listen(3000);