
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// in order to use partials we must first register the partials
hbs.registerPartials(__dirname + `/views/partials`)



//////////////////////////////OUR ROUTES////////////////////////////

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get(`/beers`, (req, res, next) => {
  // getBeers method of PUNKAPI, returns an array of 25 beers
  punkAPI.getBeers()
  .then(blah => {
      console.log("/beers punkAPI successfull");
      res.render(`beers`, { blah });

  })
  .catch(error => {
      console.log(error)
  })
})

app.get(`/random-beers`, (req, res, next) => {
  // get random() method of PUNKAPI; retuns a random beer
  const randomBeer = punkAPI.getRandom();

  randomBeer.then(beer => {
    let getBeer = beer[0];
    //console.log(beer);
    console.log(`/randomBeer punkAPI worked`);
    console.log(getBeer);
    res.render(`randomBeer`,  getBeer )
  })
  .catch(error => {
    console.log(error)
  })
})



app.listen(3000, () => console.log("Running on 3000"));
