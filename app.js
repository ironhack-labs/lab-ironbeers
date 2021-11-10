const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// register partials
hbs.registerPartials(path.join(__dirname, "/views/partials"));


// ======== ROUTES ========= 

// default
app.all('/', (req, res) => {
  res.render('home');
});

// pages
app.all("/home", (req, res) => {
  res.render("home");
});


app.all("/beers", (req, res) => {

  punkAPI
        .getBeers()
        .then( (beersFromApi) => {
          console.log('Beers from the database: ', beersFromApi)
          res.render("beers", { beers: beersFromApi })
        })
        .catch( (error) => console.log(error))
});


app.get("/random-beer", (req, res) => {

  const randomBeer = punkAPI.getRandom()

  randomBeer
  .then( (beer) => { res.render("single-beer", { beer: beer[0] }) })
  .catch( (error) => console.log(error))
  
});

app.get("/beers/:id", (req, res) => {

  const beer = punkAPI.getBeer(req.params.id)

  beer
  .then( (beer) => {
    res.render("single-beer", { beer: beer[0] })
    console.log(beer)
  })
  .catch( (error) => console.log(error))
  
});


app.listen(3000, () => console.log('Yuhuuu! Running‍ on port 3000'));
