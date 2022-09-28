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

// ...

// Add the route handlers here:

app.get("/", (req, res, next) => {
  console.log("this is the homepage"); 

  res.render('index');
  }); 

app.get("/beers", (req, res, next) => {
  console.log("beer page");

  punkAPI.getBeers()
  .then(beersFromAPI => {
    console.log('Beers from the database: ', beersFromAPI[0]);
    const data ={
      beers: beersFromAPI
    }

    res.render('beers', data);

  })
  .catch(error => console.log(error));

  
});

app.get("/beers", (req, res, next) => {
  console.log("beer page");

  punkAPI.getBeers()
  .then(beersFromAPI => {
    console.log('Beers from the database: ', beersFromAPI[0]);
    const data ={
      beers: beersFromAPI
    }

    res.render('beers', data);

  })
  .catch(error => console.log(error));

  
});

////////////////////////// RANDOM BEER //////////////////



app.get("/random-beer", (req, res, next) => {
  console.log("random beers");

  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log('Random beer from the database: ', responseFromAPI);
    
    const data = {
      beer: responseFromAPI
    }
    res.render('random-beer', data);
  })
  .catch(error => console.log(error));


  
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
