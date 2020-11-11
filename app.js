const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const chalk = require('chalk')
const PORT = 3000


const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res, next) => {
  res.render('index');
});
app.get('/beers', (req, res, next)=>{ 
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render('beers', {beersFromApi})
  })
  .catch(error => console.log(error));
})
app.get('/random-beers', (req, res, next)=>{
  punkAPI
  .getRandom()
  .then(beer => {
    res.render('random-beers', {beer})
  })
  .catch(error => console.log(error));
})

app.get('/beers/:id', (req, res) => {
  punkAPI
  .getBeer(req.params.id)
  .then(beer => {
    res.render('beer', {beer});
  })
  .catch(error => console.log(error));

});

app.listen(PORT, () => {
  console.log(chalk.green.inverse.bold(`Server listening in Port ${PORT}`))
});
