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

// add the routes here:
app.get('/', (req, res, next) => res.render('index'));

app.get('/beers', (req, res, next) => {
    punkAPI
        .getBeers()
        .then(beersFromApi =>{ 
            const selectedBeersArr = beersFromApi.slice(0,25);

            const data = { 
                beers: selectedBeersArr
            };

            res.render("beers", data )})
        .catch(error => console.log(error))

});

app.get('/random-beer', (req, res, next) => {
    punkAPI
    .getRandom()
    .then(beersFromApi => {
        const singleBeer = beersFromApi[0]
        console.log(singleBeer);
        
        res.render("random-beer", singleBeer)

})
    .catch(error => console.log(error));

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
