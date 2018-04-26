
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

  console.log('hi' );

  punkAPI.getBeers()
  .then(beers => {
    let data ={
      myObjects: beers
    } 
	// console.log(beers) // so you can see the structure of the data
	res.render('beers', data) //make sure to put the res.render inside the .then block
  })
  .catch(error => {
    console.log(error)
  })

});

app.get('/random', (req, res, next) => {
  
  punkAPI.getRandom()
    .then(oneRandomBeer => {

      console.log(oneRandomBeer[0]);
      res.render('random-beers',{ randomBeer:oneRandomBeer[0] } );
  
    })
    .catch(error => {
      console.log(error)
    })


});



app.listen(3000);