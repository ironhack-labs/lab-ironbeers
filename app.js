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

hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi)
      res.render('beers', { beerArr: beersFromApi });
    })

    .catch(error => console.log(error));

});


app.get ('/random-beers',function(request, response){
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    response.render('random-beer', {beers: responseFromAPI[0]});
  })
  .catch(error => console.log(error));
 
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
