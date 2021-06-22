const express = require('express'); //1 paso se requiere a express
//http://localhost:3000/ para abrir el servidor local en el navegador
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express(); // se instancia la aplicacion
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); // archivos estaticos

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => { // PAGINA DE INICIO
  // res.send("PRUEBA DE INICIO")
  res.render('index');
});

//la pagina web (endpoint)
app.get('/beers', (req, res) => { // PAGINA BEERS

  //promesa
  punkAPI.getBeers()
    .then(beers => {
      console.log("las cervezas", beers)
      //(vista (archivo hbs), objeto)
      res.render("beers", { beers: beers });
    })
    .catch(err => console.log(err))
});

app.get('/random', (req, res) => { // PAGINA RANDOM-BEERS

  const randomBeer = punkAPI.getRandom()
  randomBeer.then(beers => {
    console.log(beers[0].name)
    res.render('random-beers', { beers: beers });
  })
    .catch(err => console.log(err))
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
