
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



const serveBeersPage = (req, res, nxt) => {
  punkAPI.getBeers() // This returns an array
  .then(beerlist => {
    const beerObj = {beers: beerlist} // This turns our array into an object
    res.render('beers', beerObj) // This sends the object (with one property) to the beers page
    //console.log(beerlist[0])
  })
  .catch(error => {
    console.log(error)
  })
}

const serveRandomBeer = (req, res, nxt) => {
  punkAPI.getRandom() // Returns an array of one item
  .then(beers => {
    res.render('randombeers', beers[0]); // beers[0] returns the beer object, not the array
  })
}

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', serveBeersPage);
app.get('/random-beers', serveRandomBeer);

app.get('*', (req, res, nxt) => {
  res.send("404 - Beer not found")
  // res.sendStatus(404);
})


app.listen(3000);
