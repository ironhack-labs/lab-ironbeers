const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.set('views', __dirname + '/views');
// hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    const newBeers = beers.map((a, b)=>{
      let y = a
      y.number = b+1
      return y

    })
    console.log(beers[0])
    res.render('beers', {list: newBeers});
  })
  .catch(error => {
    console.log(error)
  })

});

app.get("/allbeers", (sreq,res) => {
  punkAPI.getBeers()
  .then(beers => {
    const newBeers = beers.map((a, b)=>{
      let y = a
      y.number = b+1
      return y

    })
    console.log(beers[0])
    res.render('allbeers', {list: newBeers});
  })
  .catch(error => {
    console.log(error)
  })

})


app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    console.log(beers)
    console.log("=====================");
    console.log(beers[0].food_pairing)
    console.log("=====================");
     let food = beers[0].food_pairing

    // console.log(beers[0].ingredients.malt)
    res.render('random', {list: beers, food: food});

  })
  .catch(error => {
    console.log(error)
  })

});



app.listen("3000", function(req, res) {
  console.log("server has started")
})
