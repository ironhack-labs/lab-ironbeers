const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

hbs.registerPartials(__dirname + '/views/partials')

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    const beersFromApi = punkAPI.getBeers()
    .then(beersFromApi => {
        console.log('Beers from the database: ', beersFromApi);
        res.render('beers', {
            beersFromApi
        })
    })
    .catch(error => console.log(error))
})


app.get('/random-beer', (req, res) => {
    const responseFromApi = punkAPI.getRandom()
  .then(responseFromApi => {
      console.log('Beers from the database: ', responseFromApi);
      res.render('random-beer', {
          responseFromApi
      })
  })
  .catch(error => console.log(error));
})

app.get('/detailed/:tagId', (req, res) => {
    punkAPI.getBeer(req.params.tagId)
    .then(detailedFromApi => {
        const selectedBeer = detailedFromApi[0];
      console.log('Beers from the database: ', detailedFromApi);
      res.render('detailed', selectedBeer)
  })
  .catch(error => console.log(error));
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
