const express = require('express')

const hbs = require('hbs')
const path = require('path')
const PunkAPIWrapper = require('punkapi-javascript-wrapper')

const app = express()
const punkAPI = new PunkAPIWrapper()

//Middleware for view engine
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

//Middleware for public static content
app.use(express.static('public'))



// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials')



// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { beersFromApi }))
    .catch(error => console.log(error))
})

app.get('/randomBeer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      const random = randomBeer[0]
      res.render('randomBeer', random)
    })
    .catch(error => console.log(error))
})



app.listen(3000, () => console.log('🏃‍ on port 3000'))
