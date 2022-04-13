const express = require('express');
const res = require('express/lib/response');

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
  res.render('index');
});

app.get('/beer', (req, res) => {


  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers-page', { beersFromApi }))
    .catch(error => console.log(error));




});
app.get('/random-beer', (req, res) => {


  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random_beers', { responseFromAPI })
      console.log('Beers de la base de datos: ', responseFromAPI)



    })
    .catch(error => console.log(error));
});




app.get('/beers/:id', (req, res) => {

  punkAPI
    .getBeer(req.params.id)
    .then(beersFromApi => {

      res.render('beers-page', { beersFromApi })
})
    .catch (error => console.log(error));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
