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
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    // beersFromApi could be named something else
    punkAPI.getBeers().then( beersFromApi => {
        // data could be named anything else
           res.render('beers', {data: beersFromApi});
           }).catch(error => console.log(error));
 });

app.get('/random-beers', (req, res) => {
    punkAPI.getRandom().then( beersFromApi => {
           res.render('random-beers', {data: beersFromApi});
           }).catch(error => console.log(error));
 });

 app.get('/beerdetail/:id', (req, res) => {
    punkAPI.getBeer(req.params.id).then( beersFromApi => {
        res.render('beerdetail', {data: beersFromApi});
        }).catch(error => console.log(error));
    }); 

app.listen(3000, () => console.log('🏃‍ on port 3000'));

// hint for monitoring special files
// nodemon -e js,hbs,json app.js