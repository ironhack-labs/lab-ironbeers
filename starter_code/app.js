const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// Registramos el directorio de parciales
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/beers', (req, res, next) => {
    punkAPI.getBeers()
        .then(bottle => {
            //console.log(beers)
            res.render('beers', { bottle });
            // function (bottle){
            // res.render('beers', { bottle })
        })
        .catch(error => {
            console.log(`No se ha podido conectar a la API`)
        })
        //res.render('beers', { beers });
});

app.get('/randombeers', (req, res, next) => {
    punkAPI.getRandom()
        .then(randbottle => {
            //console.log(randbottle)
            res.render('randombeers', { randbottle });
        })
        .catch(error => {
            console.log(error)
        })

});


// Server Started
app.listen(3000, () => {
    console.log('El servidor de node esta funcionando en el puerto 3000!');
});