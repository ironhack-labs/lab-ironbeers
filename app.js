const express = require('express')
const app = express()
const beers = require('./router/beers')

const expressLayouts = require('express-ejs-layouts');

const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.use(expressLayouts)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Register the location for handlebars partials here:


// Add the route handlers here:
app.use('/', beers)
app.use('/beers', beers)
app.use('/random-beer', beers)

app.listen(3000, () => console.log('🏃‍ on port 3000 - http://localhost:3000/'))