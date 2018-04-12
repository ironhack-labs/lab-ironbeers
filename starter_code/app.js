
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
  res.render('index');
});

app.get("/home", (req, res, next) => {
  res.render("index")
})

app.get("/beers", (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers[0])
    let beersList = beers;
    res.render("beers", {beersList});
  })
  .catch(error => {
    console.log(error)
  })

})

app.get("/random-beers", (req, res, next) => {
  punkAPI.getBeers()
    .then( beers => {
      console.log(beers)
      let n = beers.length;
      let index = Math.floor(Math.random()*n);
      let chosenBeer = beers[index];
      res.render("random-beers", {chosenBeer});
    })
    .catch(error => {
      console.log(error);
    });


  // punkAPI.getRandom()
  // .then(beers => {
  //   let chosenBeer = beers[0];
  //   console.log(chosenBeer)
  //   res.render("random-beers", {chosenBeer})
  // })
  // .catch(error => {
  //   console.log(error)
  // })
})





app.listen(3000, () => {
  console.log("Server is ready!")
});