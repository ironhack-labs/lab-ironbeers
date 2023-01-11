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
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then((beersFromApi) => {
      res.render('beers', { beersFromApi })
    })
    .catch((error) => {
      console.log(error)
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then((beerFromApi) => {
      res.render('random-beer', { beerFromApi })
    })
   .catch((error) => {
      console.log(error)
    })
});

app.get('/details/:id', (req, res) => {
  const id = req.params.id
  //const { id } = req.params -----> as duas formas dão na mesma, na segunda a gente usa o 'destructuring'

  punkAPI.getBeer(id)
  .then(beerDetails => {
    res.render('beer-details', { beerDetails })
  })
  .catch(err => console.log(err))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
