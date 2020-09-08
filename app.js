const express = require('express')

const hbs = require('hbs')
const path = require('path')
const PunkAPIWrapper = require('punkapi-javascript-wrapper')

const app = express()
const punkAPI = new PunkAPIWrapper()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))



app.get('/', (req, res) => {
  res.render('index')
  //console.log('Running');
})

app.get('/beers', (req, res) => {
  const beers = punkAPI.getBeers()
  beers.then(beersFromApi => 
    res.render('beers', { beersFromApi } ))     //console.log('Beers from the database: ', beersFromApi))  
  beers.catch(error => console.log(error))
})

app.get('/random-beer', (req, res) => {
  const randomBeers = punkAPI.getRandom()
  randomBeers.then(responseFromAPI => 
    res.render('random-beer', { responseFromAPI } ))
  randomBeers.catch(error => console.log(error))
})




app.listen(3000, () => console.log('🏃‍ on port 3000'))
