const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(__dirname + '/views/partials');


// add the routes here:
    // const beersFromApi = ['bla']
    // const viewVariables = {
    //     beers: beersFromApi
    // }
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then(beersFromApi => res.render('beers', {beers: beersFromApi} )) //(template file name.hbs, {variables to use in the view})
        .catch(error => console.log(error));
});
app.get('/random-beer', (req, res) => {
    punkAPI
        .getRandom()
        .then(responseFromAPI => res.render('random-beer', {beer: responseFromAPI[0]} )) //as API returns an array with one object
        .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
