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
//Beers Route here
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log(beersFromApi);
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
  //.then is equivalent to the promise so no need to repeat
});


// Random beer Route
app.get('/random-beer', (req,res)=> {
  punkAPI
  .getRandom()
  .then(randomBeersFromApi => {
    res.render('random-beer', {randomBeersFromApi});
  })
  .catch(error => console.log(error));
});





// Beer Partial Route
  app.get('/beers', (req, res) => {
    punkAPI
      .getBeers()
      .then(partialFromApi => {
        res.render('beers', { partialFromApi });
      })
      .catch(error => console.log(error));
    //.then is equivalent to the promise so no need to repeat
  });
  




//  Beer partial
hbs.registerPartials(path.join(__dirname, 'views/partials'));



//correct / dont touch:
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
