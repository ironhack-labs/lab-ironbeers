
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// middleWhere
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


hbs.registerPartials(__dirname + '/views/partials') //tengo que poner esto para que me coja la carpeta partials


app.get('/', (req, res) => { // con el método get accedo a la ruta /...
  res.render('index');  // .....  y con el método render le digo que me randerice (que me lo pinte en pantalla)
});

app.get('/beers', (req, res) => { // aquí indico que el directorio beers que...
  punkAPI.getBeers() // ... con el método getBeers de la api punkAPI que me retorna un array....
  .then(beers => {  //... que para cada elemento de ese array me randerice abajo (me pinte) los elm del array en /beers
    res.render("beers", {beers})
  })
  .catch(error => {
    console.log(error)
  })
})


app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render("random-beer", {beers})
  })
  .catch(error => {
    console.log(error)
  })

})



app.listen(3000);
