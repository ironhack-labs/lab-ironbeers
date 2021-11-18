//IMPORTACIONES
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

require('dotenv').config()

//2. MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials')


// 3. RUTAS
app.get("/random-beer", (req, res)=> {
    const randomBeers = punkAPI.getRandom()
    randomBeers.then((beers)=>{
      res.render("random-beer",{
          data:beers
      })
    })
    .catch((error)=> {
      console.log(error);
    })


})


app.get("/beers", (req,res)=>{

  //OBTENIENDO LAS PROMESAS  
  const listBeers = punkAPI.getBeers()

  //EVALUANDO LAS PROMESAS  
    listBeers.then((beers)=> {
      res.render("beers",{
        data:beers
      })
    })

    .catch((error)=> {
      console.log(error);
    })


})
// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('home', {home:'home'});
});


// 4. Server
app.listen(process.env.PORT, () => {
console.log(`Listen on port ${process.env.PORT}`);
})
