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
})
  .catch(error => console.log(error))
})


app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(randomFromApi => {
       res.render('random-beers', randomFromApi[0])
})
  .catch(error => console.log(error))
})

app.get('/details/:tagId', (req, res, next) => {
    console.log('x', req.params)
    punkAPI.getBeer(req.params.tagId)
    .then(getBeer => {
        
        const selectBeer = getBeer[0]
        res.render('details', selectBeer)
    })
})

app.listen(3002, () => console.log('🏃‍ on port 3002'));
