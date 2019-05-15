//declaracion de constantes
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
//seteos de directorios engine
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials");



//gets de la aplicación
app.get('/', (req, res, next) => {
  res.render('index');
});
app.get("/beers", (req, res, next) => {
punkAPI.getBeers()
.then(beers => res.render("beers", { beers }));
});
app.get("/ramdom-beers", (req,res,next) => {
punkAPI
  .getRandom()
  .then(beers => res.render("ramdom-beers", { beers }))
  .catch(error => {
    console.log(error);
  });
});


//puerto de escucha
app.listen(3000);
