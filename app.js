// Importaciones
const express = require('express')
const app = express()
const hbs = require('hbs')
const PunkAPIWrapper = require('punkapi-javascript-wrapper')
const punkAPI = new PunkAPIWrapper()
require('dotenv').config()

// 2.- Middlewares
app.use(express.static("public"))
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')

// 3.- Rutas
app.get("/random-beer", (req, res) => {
    const randomBeers = punkAPI.getRandom()
    randomBeers
        .then((beers) => {
            res.render("random-beer", {
                cheve: beers
            })
        })
})
app.get('/', (req, res) => {
    res.render('index', { home: 'index' })
})
app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then(beers => res.render('beers', { beers }))
        .catch(error => console.log(error));
})

// 4.- Server
app.listen(3000, () => console.log('🏃‍ on port 3000'));