
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");
app.set("layout", __dirname + "/views/layout.hbs");
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res, next) => {
  res.render('index');
}); 

app.get("/beers", (req, res, next) => {

  /* formatted API response to fit the needs of frontend (3 items per row)
  minor problem : the beers' rows end up being in a random order*/
  const beers = [];
  const promesses = [];

  for(let i = 1; i <= 8; i++) {
    promesses.push(
     punkAPI.getBeers({page: i, per_page: 3})
      .then(rowContent => {
        beers.push(rowContent);
      })
      .catch(err => {
        console.log(err);
      })
    );
  }

  Promise.all(promesses)
  .then(() => {
    res.render("beers", {
      beers: beers
    })
  })
  .catch(err => {
    console.log(err)
  });

  // punkAPI.getBeers()
  // .then(beers => {
  //   res.render("beers", {
  //     beers: beers
  //   });
  // })
  // .catch(error => {
  //   console.log(error)
  // });
});

app.get("/random-beers", (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    console.log(beers)
    res.render("randombeer", {
      beer: beers
    });
  })
  .catch(error => {
    console.log(error)
  });
});


app.listen(3000);