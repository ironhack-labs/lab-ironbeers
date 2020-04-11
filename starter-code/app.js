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

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then(beersFromApi => {
            //console.log('Beers from the database: ', beersFromApi);
            const beers = beersFromApi;
            console.log('Beers from the database: ', beers);
            res.render('beers', {beers});            
        })

        .catch(error => console.log(error));

});

app.get('/random-beer', (req, res) => {
    punkAPI
        .getRandom()
        .then(responseFromAPI => {
            const randomBeer = responseFromAPI[0]; //it retrieves an array, so I have to call the first element of the array in order to access the object inside it
            console.log('Random Beer', randomBeer);
            res.render('random-beer', randomBeer);
        })
        .catch(error => console.log(error));

});

app.get('/beers/:beer', (req, res) => {
    const beerId = req.params.beer;
    // console.log(beerId);
    punkAPI
        .getBeer(beerId)
        .then(responseFromAPI => {
            const clickedBeer = responseFromAPI[0]; 
            console.log('clickedBeer info', clickedBeer);
            res.render('random-beer', clickedBeer);
        })
        .catch(error => console.log(error));

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
