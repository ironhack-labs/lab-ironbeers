const express = require('express');
// Handlebars module
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

// app is the instance of Express, app is the server that handles req and res
const app = express();
// create the promise
const punkAPI = new PunkAPIWrapper();

// Register the location for handlebars partials here:
// HBS --> tell Express that HBS will be in charge of rendering HTML, we'll need res.render()
// HBS --> it will put the .hbs to the view and find it inside the 'views' --> res.render(index) --> index.hbs
app.set('view engine', 'hbs');
// // HBS --> tell Express app where to look for views
app.set('views', path.join(__dirname, 'views'));
//  PARTIALS --> register partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// make everything inside the 'public' available
app.use(express.static(path.join(__dirname, 'public')));


// Add the route handlers here:
// render index.hbs
app.get('/', (req, res) => {
  // second argument, it's a variable that accepts an object
  // this 'title' is going to populate in the head as title in --> layout.hbs
  // Express is going to look inside 'views' and find the HBS extention -->index.hbs
  res.render('index', {title: 'Welcome Home'});
});

// Option 1 -> .then, .catch
// Route:  beers -> beers.hbs
// app.get("/beers", (req, res) => {
//   punkAPI // promise
//   .getBeers() // return an array of beers
//   .then(beersData =>  {
//     //console.log('Beers from the database: ', beersData);
//     // render the view-> beers.hbs
//     // res.render(first, second)
//     // --> first argument -> page to render 'beers'--> Express look inside 'views' and put extention hbs--> beers.hbs
//     // --> second argument -> send the response from API
//     res.render('beers', { beersData, title: 'All beers here!' }); 
//   })
//   .catch(error => console.error(error));
// });

// Option 2 -> async / await
app.get("/beers", async (req, res) => {
  try {
  // punkAPI.getBeers --> return a promise 
  // await retrieve the data once the promise is 'resolved'
  const beersData = await punkAPI.getBeers(); 
    //console.log('Beers from the database: ', beersData);
    // res.render(first, second)
    // --> first argument -> page to render 'beers'--> Express look inside 'views' and put extention hbs--> beers.hbs
    // --> second argument -> send the response from API
    res.render('beers', { beersData, title: 'All beers here!' }); 
  } catch(err) {
    console.error(err);
  }
});

// Option 1 -> .then, .catch
// Route: random-beer -> random-beer.hbs
// app.get("/random-beer", (req, res) => {
//   punkAPI // promise
//   .getRandom() // return random beer
//   .then(beerData => {
//     res.send(beerData);
//     // we need only the first item from the array--> beerData[0], we'll need to iterate -->each
//     //res.render('random-beer',   { beerData, title: 'Random beer!' } );
//   })
//   .catch(error => console.error(error));
// });

// Option 2 -> async / await
// Route: random-beer -> Express look inside views, and render --> random-beer.hbs
app.get("/random-beer", async (req, res) => {
  try {
    const beerData = await punkAPI.getRandom(); // return the value of the promise resolved
    //console.log(beerData);
    //res.send(beerData)
    res.render('random-beer',   { beerData, title: 'Random beer!' } );
  } catch(err) {
    console.error(err);
  }
});

// Option 1 - then, catch
// When the user click on a specific tag <a> of a beer-->
// Take the id from the <a> and use the getBeer method to get the individual beer object, and render info
// XX--> id of the beer, the API gives us this id
// this will take the user to the Route --> localhost:3000/beers/beer-XX
// Here we get this route and render something to the user
// How we can access to this id? 
// Ex: localhost:3000/beers/beer-103
// Using--> req.param, to obtain/get the id of the beer
// In this case, we're looking for the .id -->
// req.params.id--> 103
// Take the route with the id, after semicolon take the id--> :id
// app.get("/beers/beer-:id", (req,res) => {
//   // req.params.id --> number
//   //const id = req.params.id;
//   // take the 'id' from the url
//   const {id} = req.params;
//   res.send(id);
 
//   //we grab the 'id' from the url with req.params, and then render the info to the user
//   punkAPI
//   .getBeer(id)  //get an individual beer
//   .then(beer => {
//     console.log(beer);
//     // title-> second argument to pass the title to head in layout.hbs
//     // in this route--> /beers/beer-103, we will render the following view to the user
//     res.render('beerInfo', { beer, title: 'Beer information!' });
//   })
//   .catch(error => console.error(error));
// });

// Option 2 - async / await
app.get("/beers/beer-:id", async (req,res) => {
  try {
    //const id = req.params.id;
    // take the 'id' from the url
    const {id} = req.params;
    //we grab the 'id' from the url with req.params, and then render the info to the user
    const beer = await punkAPI.getBeer(id);
    res.render('beerInfo', { beer, title: 'Beer information!' });
  } catch(err) {
    console.error(err);
  }
});

// listen to a port
app.listen(3000, () => console.log('🏃‍ on port 3000'));