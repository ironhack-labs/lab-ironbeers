
const express = require('express');
const hbs     = require('hbs');
const app     = express();

// configure our static files in the "public/" folder
app.use(express.static(__dirname + "/public"));

// my template files are in the "views/" folder
app.set("views", __dirname + "/views"); 

// I am using the "hbs" package from npm for our view engine
app.set("view engine", "hbs");

// I set layout.hbs to be my layout file
app.set("layout", __dirname + "/views/layout.hbs")

//hbs.registerPartials(__dirname + "/views/partials");

const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get("/beers", (request, response, next) => {
  //Inside the /beers route, call to the getBeers() method of our PunkAPI package.
  //response.send(punkAPI.getBeers()); 

  punkAPI.getBeers()
  .then(beers => {
//Remember you should call the render method after getting the beers from our package. 
    let beerList = beers;
    console.log(beers);
    response.render("beers.hbs", {beerList});
  })
  .catch(error => {
    console.log(error)
  })
});

// you should create a partial for display each beer. First, we need to register where our partials will be located.
hbs.registerPartials(__dirname + '/views/partials')

app.listen(3000);

//Finally, let's create our /random-beer route. 
//you should call the getRandom() method of the PunkAPI package, 
//and after receiving the info, render the randomBeer.hbs file 
//and passing the data of the beer.

app.get("/random-beers", (request, response, next) => {
  punkAPI.getRandom()
  .then(beers => {
      let beerRandom = beers[0];
      response.render("random-beers.hbs", {beerRandom})
  })
  .catch(error => {
    console.log(error)
  })
});