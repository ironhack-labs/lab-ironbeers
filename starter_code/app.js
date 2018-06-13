/*jshint esversion: 6 */
const express = require('express');
const hbs     = require('hbs');
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

const app     = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');



app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (request, response) => 
{
  punkAPI.getBeers()
  .then(beers => {
    response.render(`beers`, {beers});
  })
  .catch(error => {
    console.log(error);
  });
});

app.get('/:beerid', (request, response) => 
{
  let bid = request.params.beerid
  punkAPI.getBeer(bid)
  .then(beers => {
    let beer = beers[0];
    console.log(beers)
    response.render(`randomBeer`, {beer});
  })
  .catch(error => {
    console.log("DEBUG: ",error);
  });
});




app.get('/random-beer', (request, response) => 
{
  // punkAPI.getRandom()
  // .then(beers => {
  //   let beer = beers[0];
  //   console.log("DEBUG beer", beer)
  //   response.render(`randomBeer`, {beer});
  // })
  // .catch(error => {
  //   console.log("DEBUG RANDOM: ",error);
  // });
});

app.listen(3000, () => {
  
  console.log('My first app listening on port 3000!')
});