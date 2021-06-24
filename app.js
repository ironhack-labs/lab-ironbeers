const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

const getOneBeer;

punkAPI.getBeers()
.then((data) => data.json)
.then((allData) => getOneBeer = allData);


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname , "/views/partials")) 




// Add the route handlers here:

app.get('/', (req, res) => {res.render('index')});

app.all('/beers', (req, res) => {res.render('beersData') , getOneBeer});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
