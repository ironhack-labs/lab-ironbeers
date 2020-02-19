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
app.get('/beers', (req, res) => res.render('beers'))
app.get('/random-beers', (req, res) => res.render('random-beers'))

app.listen(3000, () => console.log('🏃‍ on port 3000'));









// app.get('/allbers', (req, res) => {
//     punkAPI
//         .getBeers()
//         .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
//         .catch(error => console.log(error));
// })


// app.get('/allbers', (req, res) => {
//     punkAPI
//         .getBeers();
//         // todo ok, para el then
//         .then(beersFromApi => res.render('vista', { beersFromApi }))
//         // algo va MediaList, para el catch
//         .catch(error => console.log(error));
// })