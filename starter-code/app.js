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
app.use("/beers", require("./route/beers"));
app.use("/random-beers", require("./route/random-beers"));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
