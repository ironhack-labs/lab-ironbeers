const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();



//hbs, handlebass
//aqui le indicas el motor con el que se va a renderizar
app.set('view engine', 'hbs');
//los ficheros de vista que vas a usar, estan en el directorio '/views'
app.set('views', __dirname + '/views');
//le indicamos que los parciales estan en esta ruta, tira de la const hbs =, que hemos declarado arriba
hbs.registerPartials(__dirname + '/views/partials')
//Esta parte no la entiendo muy bien, luego si podemos me explicas
app.use(express.static(path.join(__dirname, 'public')));


//esta es la respuesta que obtenemos al cargar la pagina
app.get('/', (req, res, next) => {
  const beerImage = '/images/beer.png';
  res.render('index', { beerImage });
});

//esta es la respuesta que obtenemos para ver todas las cervezas
//mediante un metodo de la punkAPI
app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(error => {
      console.log(error)
    })
});

//esta es la respuesta que obtenemos cuando pulsamos para random beer 
//mediante un metodo de la punkAPI
app.get('/random-beers', (req, res, next) => {

  punkAPI.getRandom()
    .then(beers => {
      res.render('random-beers', { beers });
    })
    .catch(error => {
      console.log(error)
    })

});



app.listen(3000);