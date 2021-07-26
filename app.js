// require("dotenv/config");

const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


hbs.registerPartials(path.join(__dirname, 'views/partials'));


//app.use("/beers", require("beers"));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get("/beers", (req, res, next)=> {
    punkAPI
  .getBeers()
  .then((apiRes) => {

    res.render("beers.hbs", {
    beers: apiRes
  });
  
})
  .catch((error) => {
  console.log(error);


  });

});

//app.get("/:id", (req, res, next) => {
//  const { id } = req.params;
//
//  punkAPI
//  .getBeers()
//  .then((apiRes) => {
//    const data = {
//      beers: apiRes,
//    };
//
//    res.render("beers.hbs", data);
//  })
//
//  .catch((error) => {
//    next(error);
//  });
//});
//
//app.get("/", (req, res, next) => {
// punkAPI.getBeers()
//  .then((apiRes) => {
//    //const data = {
//      //beers: apiRes.results,
//
//    console.log(apiRes.results);
//    res.render("beers.hbs", { beers: apiRes })
//  
//      
//   // res.render("beers.hbs", data)
//    
//  .catch((error) => {
//    next(error);
//  
//
//  });


app.get('/random-beer', (req, res, next) => {
  punkAPI
  .getRandom()
  .then(apiRes => { 
    res.render('random-beer.hbs', {
      randomBeer: apiRes[0]
    });
  }) 
  
  .catch(error => {
    console.log(error);
  });
})
app.listen(3000, () => console.log('🏃‍ on port 3000'));


//module.exports = app;
