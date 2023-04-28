const express = require('express'); //crea el servidor 

const hbs = require('hbs');

const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper'); //esta API es un paquete

const app = express();  //guardamos el server en APP
const punkAPI = new PunkAPIWrapper(); //guardamos la AP


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));  //esto es para evitar usar la ruta completa y se adapta a distintos OS

app.use(express.static(path.join(__dirname, 'public'))); // cada vez q se use un style sea en carpeta public 

//Para usar el body hay que habilitarlo con estas líneas
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => { //le asigna una opcion de respuesta a una ruta
  res.render('index');
});
app.get('/random-beer', (req,res)=>{ //ruta server
  punkAPI //declarado al inicio
  .getRandom()
  .then((randomBeerFromApi) => {
    console.log(randomBeerFromApi)
   // const perros = ["tobby ","cery"]
    res.render('random-beer', {randomBeerFromApi}); // podriamos añadir la const "perros"
  })
  .catch(error => console.log(error));
   //directorio 

})

app.get('/beers',(req, res)=>{
  punkAPI //declarado al inicio
  .getBeers()
  .then((beersFromApi) => {
    
    res.render('beers', {beersFromApi});
  })
  .catch(error => console.log(error));
})
//el RES es para una accion que el usuario ve

app.post('/beers',(req,res)=>{
  const datos = req.body
  res.redirect("/")
  console.log(datos)
})

 

app.get('/:beerId', async(req , res)=>{
  // req.params
 //console.log(req.params) // → { nombre: 'fritz' }
  // { beerId: '3' }
  const id = req.params.beerId
  const beerDetails = await punkAPI.getBeer(id)
  console.log(beerDetails)
  
  res.render("beer-details", {beerDetails}) //lo enviamos a beer-details.hbs


  //-----------------------ALTERNATIVA CON THEN------
  // punkAPI.getBeer(id)
  // .then(beerFromApi => {
  //   console.log('Beers from the database: ', beerFromApi)
  //   res.render("beer-details", {beerFromApi})
  // })
  // .catch(error => console.log(error))
})
app.get('/:beerId/image', async(req, res)=>{
  const id = req.params.beerId
  const beerDetails = await punkAPI.getBeer(id)
  console.log(beerDetails)
  
  res.render("beer-details-image", {beerDetails}) // lo enviamos a beer-details.hbs
})







//ReferenceError: beersFromApi is not defined


app.listen(3000, () => console.log('El server está funcionando')); // la mas importante, monta el server
