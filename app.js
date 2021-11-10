const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

//Middleware for the partials
hbs.registerPartials(__dirname + "/views/partials");


// Add the route handlers here:




app.get("/beer", (req, res, next) => {
  punkAPI.getBeers()
    .then(beersFromApi => res.render("beer",{beersFromApi}))
      
    .catch(error => console.log(error));
  
});

app.get("/randomBeer", (req, res, next) => {
  
  punkAPI
  .getRandom()
  .then(beersFromApi => {
    // your magic happens here
    res.render("randomBeer",{beersFromApi})
  })
  .catch(error => console.log(error));
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
