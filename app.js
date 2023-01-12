const express = require('express');//

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express(); //
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


// Register the location for handlebars partials here:
//hbs.registerPartials("partials_absolute_path")
hbs.registerPartials(__dirname +"/views/partials")   //bonus
// ...

// Add the route handlers here:
//Our starter code includes the basic configuration needed to run our app. The / route is set to render the index.hbs file. Let's start by creating a layout.
app.get('/', (req, res, next) => { //41
  res.render('index');
});

//Create a /beers route inside the app.js file.
//Inside the /beers route, call the getBeers() method (the PunkAPI provides this method, and you can find more about it here). Calling the .getBeers() method returns a promise that should be resolved with an array of 25 beers.
//Down the road, you should pass that array to the beers.hbs view.  ::::: //<h1>beers</h1>{{#each beers}}<div>{{this.name}}</div>{{/each}}
app.get("/beers", (req, res, next) => {
  punkAPI
  .getBeers()
  .then( beersFromApi =>{
    res.render("beers", {beers:beersFromApi})   // you should call the render method after getting the beers array. Hint: That means inside of the function you're passing to the then method. 
    
    console.log('Beers from the database:', beersFromApi)
  })
  .catch(error => console.log(error));

 });

 app.get("/random-beer",(req, res, send) => {
   punkAPI
   .getRandom()
   .then(beersFromApi =>{
    res.render("random-beer",beersFromApi[0]);
        console.log('random beer?')
   })
    .catch(error=>console.log(error))
 });
 


app.listen(3000, () => console.log('🏃‍ on port 3000'));
