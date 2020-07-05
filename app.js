const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();

const homeRoutes = require('./routes/home');
const beersRoutes = require('./routes/beers');
const randomBeerRoutes = require('./routes/random-beer');


const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
// Register the location for handlebars partials here:

app.use('', homeRoutes);
app.use('/beers', beersRoutes);
app.use('/random-beer', randomBeerRoutes);



app.listen(3000, () => console.log('🏃‍ on port 3000'));


