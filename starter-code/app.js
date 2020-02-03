const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then(beersFromApi => {
            console.log('Beers from the database', beersFromApi)
            res.render('beers', {beersFromApi})})
        .catch(error => console.log(error));
    
});

app.get('/random-beers', (req, res) => {
    punkAPI
  .getRandom()
  .then(responseFromAPI => {
    //   const beer = responseFromAPI[0]
    //   console.log(beer)
      console.log(responseFromAPI.name)
    res.render('random-beers', {responseFromAPI})
  })
  .catch(error => console.log(error));
});

app.get('/beer/:id', (req, res) => {
    punkAPI
        .getBeer(req.params.id)
        .then(beer => {
            console.log(beer)
            res.render('selected-beer', {beer});
        })
        .catch(dbErr => console.error("OH no, db err :", dbErr));
})


app.listen(3007, () => console.log('on port 3007'));
