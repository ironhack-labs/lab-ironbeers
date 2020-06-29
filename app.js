const express = require('express')
const app = express()
const router = require('./router')

const hbs = require('hbs');
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))


app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// Register the location for handlebars partials here:
hbs.registerPartials( path.join(__dirname, 'views/partials'), function (err) {});
hbs.registerPartial('header', 'header');
hbs.registerPartial('footer', 'footer');

// Add the route handlers here:
app.use('/', router)
app.use('/beers', router)
app.use('/random-beer', router)

app.listen(3000, () => console.log('🏃‍ on port 3000 - http://localhost:3000/'))