const express = require('express');
const chalk = require('chalk')

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index')
})

const beersArray = punkAPI.getBeers()
app.get('/beers', (req, res) => {
  beersArray.then((beersArray) => {
    console.log(chalk.green(`${beersArray.length} beers received from the database`))
    res.render('beers', {beersArray});
  })
  beersArray.catch((error) => {
    console.log(chalk.red('It has been an error: ', error))
  })
})

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom()
  randomBeer.then((randomBeer) => {
    console.log('adsf', randomBeer)
    res.render('random-beer', randomBeer[0])
  })
  randomBeer.catch((error) => {
    console.log(chalk.red('Error: ', error))
  })
})

app.get('/beers/beer-:id', (req, res) => {
  const id = req.params.beer
  console.log('id: ', id)
  punkAPI.getBeer(id)
  
})

app.listen(3002, () => console.log('🏃‍ on port 3002'));
