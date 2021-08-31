const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname+('/views/partials'))



app.get('/', (req,res) => res.render('home'))

app.get('/beers', (req,res,next) => {
  
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers',{beersFromApi}))
    .catch(error => console.log(error))
})


app.get('/random-beer', (req,res) => {
  
  punkAPI
    .getRandom()
    .then(responseFromAPI => res.render('random-beer',{responseFromAPI}))
    .catch(error => console.log(error));

})

app.get('/selected-beer', (req,res) => {
  
  punkAPI
    .getRandom()
    .then(responseFromAPI => res.render('selected-beer',{responseFromAPI}))
    .catch(error => console.log(error));

})

app.get("/beers/:id", (req,res) => {

    punkAPI
      .getBeers({"ids": req.params.id})
      .then(selectedBeer =>  res.render('selected-beer',{selectedBeer}))
      .catch(error => console.log(error));
})

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
