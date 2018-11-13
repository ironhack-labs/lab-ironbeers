
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkThing = require('punkapi-javascript-wrapper');
const punkAPI = new PunkThing();

//middleware, what connects backend to localhost:3000 page
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', (req, res, next) => {
  res.render('index');
});

// this route to get list of beers
app.get('/beersList', (req, res, next) => {
  punkAPI.getBeers()
  .then(theListOfBeers => {
      // console.log("===========", beers)
  // data = {
  //   beers: theListOfBeers,
  //   brewingInfo: lorem ipsum
  //   brewingIngredients: theListOfBeers.ingredients
  // }
  res.render('beerViews/beerList', {beers: theListofBeers})
  // beers key makes it easier on the page, don't have to write theListOfBeers, or let it access an object named data within the function.
  })
  .catch(error => {
    console.log(error)
  })
})

// this route to get 1 random beer from the API
app.get('/randomBeers', (req, res, next) => {
  punkAPI.getRandom()
  .then(theRandomBeer) => {
    res.render('beerViews/randomBer', {oneBeer:theRandomBeer})

  })
}



app.listen(3000);



// 'i' short for install
// npm --save install punkapi javascript wrapper in terminal
// fork it and git clone into folder to get required installs.

// npm install
// will run source code for the assignment from the project folder.
// npm init always install the package.json file.

// var PunkThing = require('punkapi-javascript-wrapper');
// var punkApi = new PunkThing()

// create route = app.get('/beers', (req, res, next)=>{

// //punkapi.getbeers returns a list of beers.

// // punkapi.getbeers is asynchronous


//       punkApi.getBeers()
//       .then((theListOfBeers)=>{

//       res.render('beers', {listOfBeers: listOfBeers})
// // 2nd arg MUST ALWAYS be an object. so make it {list of beers: : for array, : listOfBeers}


// // .then and then console.log(x[0]) to test the api, to be sure it shows up correctly. console shows up in terminal. x[0] will bring up a beer and its info selected from the array.
//       })

// })
// then create file beers.hbs in views folder for the project.

