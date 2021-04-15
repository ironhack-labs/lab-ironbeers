const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials("views/partials");


// Add the route handlers here:

app.get('/', (req, res) => res.render("index", {title: "Home"}));

// Unsure How to Properly Execute 
// app.get('/beers', (req, res, next) => {
//   const beers = punkAPI.getBeers().then(beersFromApi => {
//     res.render("beers", {title: "Beers"});
//     console.log('Beers from the database: ', beersFromApi);
//     }).catch(error => console.log(error));
// })

app.get('/beers', (req, res, next) => res.render("beers", {title: "Beers"}));
app.get('/random-beer', (req, res, next) => res.render("random-beer", {title: "Random Beer"}));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
