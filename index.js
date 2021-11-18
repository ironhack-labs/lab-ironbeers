
// 1. Importaciones
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

// 3.- Rutasd
app.get('/random-beer', (req, res) => {
    punkAPI
    .getRandom()
    .then(beer => {
      res.render('random-beer', {beer})
    })
    .catch(error => console.log(error));
})

app.get('/beers', (req, res) => {
    // Una Promise es un objeto que representa la terminación o el fracaso de una operación asíncrona
    punkAPI
      .getBeers()
      .then(beers => res.render('beers', {beers}))
      .catch(error => console.log(error));
})

app.get('/', (req, res) => {
    res.render('home', {home:'home'})
})


// 4.- Server
app.listen(process.env.PORT, () => {
    console.log(`Listen on port ${process.env.PORT}`);
})



