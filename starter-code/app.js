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
app.get('/', (req, res, next) => res.render('index'));

app.get('/beers', (req, res, next) => {
    punkAPI.getBeers()
    .then(beersFromApi => {
        res.render('beers', {allBeers: beersFromApi})
       // console.log('Beers from the database: ', beersFromApi)
    })
    .catch(error => console.log(error))
    
})

app.get('/random-beers', (req, res, next) => {
    punkAPI.getRandom()
    .then(randomFromApi => {
        const randomBeer = randomFromApi[0]
        res.render('random-beers', randomBeer)
      // console.log(randomFromApi[0])
  })
  .catch(error => console.log(error));
    
})

app.get('/details/:tagId', (req, res, next) => {
    punkAPI.getBeer(req.params.tagId)
    .then(oneBeer => {
        const selctedBeer = oneBeer[0]
       res.render('details', selctedBeer)  
        
       //console.log(oneBeer)
  })
  console.log('params', req.params)
    
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
