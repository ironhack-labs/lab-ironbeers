const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// Establecemos el motor de visualización y los directorios de vistas y de recursos estáticos

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')


// Randerizamos la vista deseada (ojo! meterá la vista dentro de layout.hbs)

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/beers', (req, res, next) => {

    punkAPI.getBeers()
        .then(beers => {
            res.render('beers', { beers });
        })
        .catch(error => {
            console.log(error)
        })

});

app.get('/randomBeers', (req, res, next) => {

    punkAPI.getRandom()
        .then(randomBeer => {
            res.render('randomBeers', { randomBeer });
        })
        .catch(error => {
            console.log(error)
        })

});



app.listen(3000);