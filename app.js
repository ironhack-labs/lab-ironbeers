const express = require('express')
const app = express()
const path = require(`path`)
const hbs = require(`hbs`)

app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `hbs`)
app.use(express.static(`public`))
hbs.registerPartials(__dirname + `views/partials`)

app.get('/', (req, res) => {
  fetch(`https://api.openbrewerydb.org/v1/breweries`)
    .then((response) => response.json())
    .then((response) =>
      res.render(`index.hbs`, { breweries: response })
    )
})

app.get(`/beers`, (req, res) => {
  res.render(`beers.hbs`)
})

app.get(`/randomBeer.hbs`, (req, res) => {
  res.render(`/randomBeer.hbs`)
})




app.listen(3000, () => console.log('🏃‍ on port 3000'));
