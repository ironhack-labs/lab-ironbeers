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

// this is needed to be able to use partials
const handlebars = require('hbs');
handlebars.registerPartials(__dirname + '/views/partials');


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index' ,{ 
    content: 'This is some content' });
});


app.get('/random-beers', (req, res) => {
  punkAPI
  .getRandom()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    res.render('beers', {beers: beersFromApi});  
  })
  .catch(error => console.log(error));
});


app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    res.render('beers', {beers: beersFromApi});  
  })
  .catch(error => console.log(error));
});
//whenever a promise happens, two things can are possible
//one: is successfully ==> then()
//two: it fails ==> catch()

// const beer1 = punkAPI.getBeer(1)




app.get('/beers/:id', (req, res) => {
  const godfather = beer.find(function (movie) {
      return beer.id;
  })
  res.render('movieDetails', { clickedMovie: godfather })
})


hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.listen(3000, () => console.log('🏃‍ on port 3000'));
