const express = require('express')

const hbs = require('hbs')
const path = require('path')
const PunkAPIWrapper = require('punkapi-javascript-wrapper')

const portNum = 3000

const app = express()
const punkAPI = new PunkAPIWrapper()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

// Register the location for handlebars partials here:

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(portNum, () => console.log(`🏃‍ on port ${portNum}`))
