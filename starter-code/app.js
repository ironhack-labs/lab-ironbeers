const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res, next) => res.render('index'));

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(APIbeers => res.render('beers', { APIbeers }))

    .catch(error => console.log(error));
});


app.get('/random-beer', (req, res, next) => {
    punkAPI
    .getRandom()
    .then(randomBeer => {

        let oneRandomBeer = randomBeer[0]
        console.log(oneRandomBeer)
        res.render('random-beer', oneRandomBeer)

    } )
    .catch(error => console.log(error));

    })

app.listen(3000, () => console.log('🏃‍ on port 3000'));
