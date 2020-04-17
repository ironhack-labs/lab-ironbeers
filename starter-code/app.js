const express = require('express');
const app = express();

const hbs = require('hbs');
const path = require('path');
hbs.registerPartials(__dirname + '/views/partials');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(__dirname + '/views/partials');

// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((beersFromApi) => {
      //this is the result of what database gives us
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beersFromApi }); //render exits the function so has to come last. have to put beers array in an object with the array as a key and value
    })
    .catch((error) => console.log('Error rendering beers', error));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then((responseFromAPI) => {
      console.log('Random beer from database:', responseFromAPI);
      res.render('random-beers', { randomBeer: responseFromAPI });
    })
    .catch((error) => console.log('Error rendering random beer', error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

// on api -- mongoose.connection.close() //you have to close the connection otherwise the script keeps running on the machine
//note if you have two promises it is a bit trickier to close the connection.
// you have to create a method promise.all, which takes an array of all the things to
//be implemented (promise 1, promise 2 etc.), and THEN it closes the connection. see
//promise-all.js line 14
