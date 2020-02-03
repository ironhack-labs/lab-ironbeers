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
app.get('/', (req, res) => res.render('index'));

// const beers = require('./routes/beers');
// app.use('/', beers);

app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then(beersFromApi => {
            res.render('beers', {
                beersFromApi
            })
            // console.log('Beers from the database: ', {
            //     beersFromApi
            // })
        })
        .catch(error => console.log(error));
})

app.get('/random-beer', (req, res) => {
    punkAPI
        .getRandom()
        .then(responseFromAPI => {
            res.render('random-beer', {
                random: responseFromAPI[0]
            })            
        })
        .catch(error => console.log(error));
})

app.listen(3000, () => console.log('http://localhost:3000'));

module.exports = app;