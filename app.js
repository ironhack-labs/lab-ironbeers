const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
 // res.send("INICIO")
  res.render('home-page');
});

app.get('/cervezas', (req, res) => {
  //res.send("CERVEZAS")


punkAPI
.getBeers()
  .then(beersFromApi => res.render('beer', { beerList : beersFromApi }))
  .catch(error => console.log(error));

});







app.get('/cervezas-random', (req, res) => {
  //res.send("CERVEZAS")

  punkAPI
  .getRandom()
  .then(responseFromAPI => {
   // console.log("-------",responseFromAPI)
    res.render('random-beer', responseFromAPI[0] )
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
