const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname+'public/images');

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  console.log('working')
  // res.send("hello")
  res.render('index.hbs');
});


app.get('/beer', (req, res) => {
  punkAPI
  .getBeers()
  .then((beersFromApi) =>{ 
    // console.log('Beers from the database: ', beersFromApi)
  
    res.render('beer.hbs',{beersFromApi});
})
  .catch(error => console.log(error));
  
});


app.get('/random-beers', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log(responseFromAPI)
    res.render('random-beer.hbs',{responseFromAPI });
  })
  .catch(error => console.log(error));

  
});


app.listen(3001, () => console.log('🏃‍ on port 3000'));
