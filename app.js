const express = require('express');
const hbs = require('hbs');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi }) // renderizamos beers y le pasamos el array dentro de la variable beers
    })
    .catch(error => console.log(error)); // le decimos que si no se puede cumplir la promesa lance este error
  
})

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then((beers) => {
    res.render('random-beer',  beers[0] );
  })
  .catch(error => console.log(error));
})

app.get('/:id', (req, res) => {
  
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
