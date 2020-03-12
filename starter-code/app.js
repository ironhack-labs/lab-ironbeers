const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');
// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));


app.get('/Beers', (req, res) => {
    punkAPI
   .getBeers()
   .then(beersFromApi =>{
        console.log('Beers from the database: ', beersFromApi);
        res.render('Beers', {beersFromApi});
   })
   .catch(error =>{ console.log(error)
})

  });
  
  
  app.get('/RandomBeer', (req, res) => {
    res.render('RandomBeer');
  });

  app.listen(3000, () => {
    console.log('listening on port', 3000);
  });
