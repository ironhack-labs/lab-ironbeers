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
hbs.registerPartials(`${__dirname}/views/partials`)
// ...
console.log("arrancando servidor")
// Add the route handlers here:

app.get('/', (req, res) => {
  console.log("Intento de cargar")
  // res.send('yabaduuuu')
  res.render('index');
});

app.get('/beers', (req, res) =>{
  // res.send('eyyy')
  // punkAPI.getBeers()
  //   .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
  
  punkAPI.getBeers()
  .then(beersFromApi => {
    
    const beersObject = {beersToObject: beersFromApi}
  
    res.render('beers', beersObject)
  
  })
  .catch(err => console.log(err))
  console.log(punkAPI.getBeers())
})

app.get('/random-beer', (req, res) =>{
    //  res.send('eyyy')

punkAPI.getRandom().then(random =>{
  const randomOutPut = {randomBeer: random}

  res.render('random-beer', randomOutPut)
})

})

//each con id para cada beer en hbs
//app.get comun con los params
//getBeer() por id

app.listen(3000, (x) => console.log('🏃‍ on port 3000', x));
