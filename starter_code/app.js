
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "hbs") // which program should render my views ? HBS

hbs.registerPartials(__dirname +"/views/partials") //where partials are stores



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next)=>{
  //res.render('beers') // Génère un modèle de vue.

  punkAPI.getBeers()
        .then(beers => { 
          res.render('beers', {beers})
        })
        .catch(error => {
          console.log(error)
        })

})


app.listen(3000);
