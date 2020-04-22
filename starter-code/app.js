const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
const PORT = 3000;

//set view engine
app.set('view engine', 'hbs');
//set the views folder
app.set('views', path.join(__dirname, 'views'));

// set the folder to serve the partials
hbs.registerPartials(__dirname + '/views/partials');

//MIDELWARE
app.use(express.static(path.join(__dirname, 'public')));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((beersFromApi) => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beers: beersFromApi });
    })
    .catch((error) => console.log(error));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then((randomBeers) => {
      console.log('random-beer from the database: ', randomBeers);
      res.render('random-beers', { randomBeers: randomBeers });
    })
    .catch((error) => console.log(error));
});

app.get('/beerdetails/:id', (req, res) => {
  const id = req.params.id;
  punkAPI
    .getBeer(id)
    .then((data) => {
        console.log(data[0].method.mash_temp)
      res.render('details', { beer: data });
      
    })
    .catch((error) => console.log(error));
});

// START SERVER
app.listen(PORT, () => console.log(`🏃‍ on port ${PORT}`));
