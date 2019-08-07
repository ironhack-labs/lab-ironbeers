//require all the packages you will need
const myExpress = require('express');

//package that allows templating and dynamic views
const PORT = 3000;
const hbs = require('hbs');
const app = myExpress();
// const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(myExpress.static(('public')));

// *******************
// ROUTES
// *******************

app.get('/', (req, res, next) => {
  res.render('index');
});

// ROUTE FOR GETTING ALL THE BEERS AND IT'S RENDERED ON "/BEERS"
app.get("/beers", (req, res, next)=>{
  punkAPI.getBeers()
  .then(responseFromDB => {
    // console.log("response is: ", responseFromDB)
    // (page you want to render) allBeers is the hbs file that's gonna be rendered, it comes from "views" folder
                            //"beers is thename of a variable we will use in hbs file"
    res.render("allBeers.hbs", {beers: responseFromDB})
  })
  .catch(error => {
    console.log(error)
  })
});

// ROUTE FOR GETTING ALL THE BEERS AND IT'S RENDERED ON "/RANDOMBBEERS"
app.get("/random-beer", (req,res,next)=>{
  punkAPI.getRandom()
  .then(beers => {
    // console.log("Random beer: ", beers[0]);
    const theBeer = beers[0];
    res.render("random-beer", theBeer);

  })
  .catch(error => {
    console.log(error)
  })

});

app.listen(PORT, () => console.log("🏃‍ on 3000"));
