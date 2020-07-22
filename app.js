const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + "/views/partials")

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here

// ..

// Add the route handlers here:

app.get('/', (req, res, next) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render("beers.hbs", {
      beersFromApi
    }))
    .catch(error => console.log(error));
});

//Llamamos a la Api y le pasamos el método getRandom()
//Con la respuesta, lo renderizamos en su hbs correspondiente y
//pasamos a un objeto y declaramos que la oneRandomBeer es el primer índice del array
//de la respuesta de la Api
app.get('/random-beers', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(responseFromApi => {
      res.render("randomBeers.hbs", {
        oneRandomBeer: responseFromApi[0]
      });
    })
    .catch(error => console.log(error))
});


app.listen(3001, () => console.log('🏃‍ on port 3001'));