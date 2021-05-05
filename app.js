const express = require('express');

const hbs = require('hbs');
const path = require('path');

const app = express();
const PunkAPIWrapper = require("punkapi-javascript-wrapper")
const punkAPI = new PunkAPIWrapper()


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials")
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

  const beer = punkAPI.getBeers()

  beer.then((resApi) => {
    let data = {
      beer: resApi
    } 
    console.log(data)
    res.render('beers', data)
  })

})

app.get('/random-beer', (req, res, next)=> {

  const randomBeer = punkAPI.getRandom()

  randomBeer.then((resApi) => {
    let randomData = {
      randomBeer: resApi
    }
    console.log(randomData)
    res.render('random-beer', randomData)
  })
  
  
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));


