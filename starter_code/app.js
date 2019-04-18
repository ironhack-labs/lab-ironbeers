
const express = require('express'); 
const hbs     = require('hbs');
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


const app     = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials') 

//home
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beers => {
      console.log(beers)
      res.render('beers', {beers})
    })  
    .catch(error => {
        res.render('error')
    })
})

app.get('/random-beer', (req, res) => {
  res.render('random-beer')
})


let PORT = 3000;

app.listen(PORT, () => {
  console.log(`Corriendo puerto ${PORT}`)
});
