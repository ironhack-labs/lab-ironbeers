
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
      let n = beers.length;
      let index = Math.floor(Math.random()*n);
      let chosenBeer = beers[index];
      let str = chosenBeer.food_pairing;
      let str0 = str[0];
      let str1 = str[1];
      let str2 = str[2];
      res.render("random-beers", {chosenBeer, str0, str1, str2});
    })
    .catch(error => {
      console.log(error);
    });
})





app.listen(3000, () => {
  console.log("Server is ready!")
});