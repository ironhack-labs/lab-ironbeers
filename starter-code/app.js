const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
    punkAPI.getBeers()
        .then(beersFromApi => res.render('beers', {
            allBeers: beersFromApi
        }))
        .catch(error => console.log(error));



})
app.get('/random-beers', (req, res) => {
    punkAPI.getRandom()
        .then(randomBeers => res.render('random-beers', {
            randomBeer: randomBeers
        }))

        // const randomBeer = punkAPI.getRandom()

        // randomBeer.then(beer => {
        //         alert(beer[0].name)
        //     })


        .catch(error => console.log(error));

})


app.listen(3000, () => console.log('🏃‍ on port 3000'));