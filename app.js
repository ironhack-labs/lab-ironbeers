const express = require('express');           // Requerir Express

const hbs = require('hbs');                   // llamo a hbs
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();                        //Instanciar la aplicación a partir de Express
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); //Incluir el middleware de directorio con archivos estáticos public

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));   // Necesario para el SETup de partials. Nota: "Colocar / "

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => { 
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers.hbs', { theBeers: beersFromApi});
      console.log(beersFromApi[0])
    })
    .catch(error => console.log(error));
});

app.get('/beers/:id',(req,res)=> {
  punkAPI
    .getBeer(req.params.id)
    .then(responseFromAPI=>{
      res.render('random-beer', { randomFinalBeer: responseFromAPI })
    })
    .catch(error => console.log(error));
})

app.get('/random-beer', (req, res) => {
  console.log('random choice')

  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beer', { randomFinalBeer: responseFromAPI});
      console.log(responseFromAPI)
    })
    .catch(error => console.log(error));
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));   //levantar  el servidor en 3000

