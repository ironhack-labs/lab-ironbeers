
const express = require('express')
const hbs = require('hbs')
const app = express()
const path = require('path')
const PunkAPIWrapper = require('punkapi-javascript-wrapper')
const punkAPI = new PunkAPIWrapper()

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static('public'))
//app.use(express.static(path.join(__dirname, 'public')))



app.get('/', (req, res) => {

  res.render('index')
})

app.get('/beers', async (req, res) => {
  const beers = await punkAPI.getBeers()
  res.render('beers', { beers })
})

app.get('/randombeers', async (req, res, next) => {
  const [beer] = await punkAPI.getRandom()
  res.render('randombeers', {
    beer
  });

  console.log('Random', beer)
});

const PORT =  1987

app.listen(PORT, () => {
	console.log(`server on: http://localhost:${PORT}`)
})
