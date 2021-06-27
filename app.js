const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, "./views/partials"))


//creating the routes
//iteracion 3
app.get("/beers", (req, res)=>{
  punkAPI.getBeers()
  .then(beersFromApi =>{ 
    res.render("beers", {objetoArrayDeCervezas : beersFromApi})//render siempre tiene que coger un objeto, así que creamos uno con la key objetoArrayDeCervezas y le asignamos el valor beersFromApi, que es un array.
    console.log("Beers from the database:", beersFromApi)
  })
  .catch(error=> console.log(error));
})
//iteracion 4
app.get("/random-beer", (req, res)=>{
  punkAPI.getRandom()
  .then(randomBeer =>{
    res.render("random-beer", randomBeer[0])//otra manera de convertir el array a objeto
    console.log("random-beer", randomBeer[0])  
  })
  .catch(error=> console.log(error));
})

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beerProfile/:id", (req, res)=>{
  punkAPI.getBeer(req.params.id)
  .then(beerId =>{
    res.render("beerProfileId" , beerId[0])
    console.log(beerId)
  })  
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
