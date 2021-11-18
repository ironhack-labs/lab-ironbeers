const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// 2. MIDDLEWARES
app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:
//--------Root HOME--------------
app.get('/', (req, res) => {
    res.render('home', {
      home: 'home'
    });
});

//--------Root RANDOME BEER--------------
app.get('/random-beer', (req, res) => {
    punkAPI
    .getRandom()
    .then(beer => {
      res.render('random-beer', { 
        beer: beer 
      });
    })
    .catch(error => {
        console.log(error)
    });
});

//--------Root BEERS--------------
app.get('/beers', (req, res) => {
  // Una Promise es un objeto que representa la terminación o el fracaso de una operación asíncrona
    punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers', {   // Respuesta al cliente, Iteracion de las beers (beers es la lista completa de la instancia de cervezas)
        beers: beers 
      });
    })
    .catch(error => {       // SI LA PROMESA NO SE CUMPLIÓ SE ejecuta
      console.log(error)
  });
});
//--------Root IDBeer--------------
app.get('/id-beer', (req, res) => {
  punkAPI
  .getBeer()
  .then(id => {
    res.render('id-beer', { 
      id: id 
    });
  })
  .catch(error => {
      console.log(error)
  });
});





let id = punkAPI.getBeer()

id.then((id) =>{
  // console.log(id)            <-------- consologea el id de getBear para ir por solo un objeto de arreglo
})

let listaBeers = punkAPI.getBeers()
  //  console.log(listaBeers)   <-------- consologea la promesa, va por todos los datos a la API
listaBeers.then((beers) => {
  // console.log(beers)         <-------- consologea la lista ya que This method takes a 
                                        //function that will be passed the resolved value of the Promise once it is fulfilled.
})


//------SERVIDOR 3000-------------
app.listen(3000, () => console.log('🏃‍ on port 3000'));
