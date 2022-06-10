const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + 'views/partials');

// Add the route handlers here:

app.get('/', (req, res,next) => {
  res.render('index');
});

app.get('/beers',(req,res,next)=>{
  punkAPI
  .getBeers()
  .then(chelitas => {
    console.log('Beers from the database: ', typeof(chelitas))
    res.render('beers',{chelitas})
  })
  .catch(error => console.log(error));
})

app.get('/random-beer',(req,res,next)=>{
	console.log('Apartado de random-beer')
  punkAPI
  .getRandom()
  .then(aleatorio => {
    console.log('RandomBeer: ', aleatorio)
    res.render('randomBeer', {aleatorio})
  })
  .catch(error => console.log(error));
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
