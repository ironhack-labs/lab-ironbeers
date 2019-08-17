
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers.hbs',{
      beers
    });
  })
  .catch(error => {console.log(error)
})
});

// app.get("/random-beer", (req, res, next) => {
//   punkAPI.getRandom()
//   .then(beers => {
//     // console.log("Random beer: ", beers[0]);
//     const theBeer = beers[0];
//     // console.log('the beer:', theBeer)
//     res.render("random-beer", theBeer );
//   })
//   .catch(error => console.log(error));
// });



app.get('/randombeers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    const theBeer = beers[0];
    res.render("random-beers.hbs", theBeer);
  })
  .catch(error => {console.log(error)})
})

app.listen(3000);