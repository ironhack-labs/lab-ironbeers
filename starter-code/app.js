const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(allBeers => {
      data = {
        listOfBeers: allBeers
      };
      res.render('beers', data);
      // console.log('Beers from the database: ', beersFromApi);
    })
    .catch(error => console.log(error));

  //let beers = punkAPI.getBeers();
  //response.render(beers);
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      data = {
        sigleBeer: responseFromAPI[0]
      };
      console.log(data);
      res.render('random-beers', data);
      // your magic happens here
    })
    .catch(error => console.log(error));
});
app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
