
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
app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.render('index');
});





app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    let data = {
      beers: beers
    }
	console.log(beers) // so you can see the structure of the data
	res.render('beers',data ) //make sure to put the res.render inside the .then block
  })
  .catch(error => {
    console.log(error)
  })
});






app.get('/random-beers', (req, res, next) => {
  
  punkAPI.getRandom()
  .then(beers => {
    console.log("===============");
    console.log(beers[0])


    // let data={
    //   beers: beers
    // }
    res.render('random-beers', { randomBeer: beers[0] })
  })
  .catch(error => {
    console.log(error)
  })  
  
});




app.listen(3000);