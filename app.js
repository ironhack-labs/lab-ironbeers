const express = require('express')
const hbs = require('hbs')

const path = require('path') // ???
const PunkAPIWrapper = require('punkapi-javascript-wrapper')

const app = express()
const punkAPI = new PunkAPIWrapper()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
hbs.registerPartials(__dirname + '/views/partials')


app.get('/', (req, res, next) => {
  res.render('home')
})

app.get('/beers', (req, res, next) => {
  const beers = punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers})
  })
  .catch(error => console.log(error))
})

app.get('/beers/:id', (req, res, next) => {
  // en beers.hbs le estoy diciendo que ponga en la url el id (linea 13)
  // para que matchee esa url con mi :id de aquí hay que igualarlo
  // NOTA: he probado con tantas lógicas que no entiendo como lo he logrado
  let id = Number(req.params.id)
  const pickerBeerShow = punkAPI.getBeers()
  .then(beer => {
    let a = beer.find((b) => b.id === id)
    res.render('detail', {beer: a})
  })
  .catch(error => console.log(error))
})

app.get('/random-beers', (req, res, next) => {
  const randomBeer = punkAPI.getRandom()
  .then(randomBeer => {
    res.render('random-beer', {randomBeer})
  })
  .catch(error => console.log(error))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
