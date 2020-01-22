const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the routes here
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
        punkAPI
            .getBeers()
            .then(beers => console.log('Beers from the database: ', beers))
            .catch(error => console.log(error));
        res.render('beers'));
}

app.listen(3000, () => console.log('🏃‍ on port 3000'));