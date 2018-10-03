const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// Partial
hbs.registerPartials(__dirname + "/views/partials/")
app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beer', (req, res) => {
    punkAPI.getBeers()
        .then(beers => {
            res.render("beer", {
                beers
            })
        })
        .catch(error => {
            console.log(error)
        })
});

app.get('/random-beers', (req, res) => {
    punkAPI.getBeers()
        .then(beers => {
            res.render("random-beers", {
                beers
            })
        })
        .catch(error => {
            console.log(error)
        })
});

app.listen(3000);