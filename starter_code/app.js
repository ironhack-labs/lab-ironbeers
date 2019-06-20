
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public'))); //indicate that in the server, the public dic serve static files such as images, CSS files, and JavaScript files
app.set("view engine", "hbs") // which program should render my views ? HBS

hbs.registerPartials(__dirname +"/views/partials") //where partials are stores



app.get('/', (req, res, next) => {
  css=['styles', 'index']
  res.render('index');
});

app.get('/beers', (req, res, next)=>{
  //res.render('beers') // Génère un modèle de vue.
  css=['beers', 'styles']
  punkAPI.getBeers()
    
        .then(beers => { 
          res.render('beers', {beers})
          beers.forEach(b => { 
            console.log( "beer name:", b.name )
          });
          
        })
        .catch(error => {
          console.log("error while getting beers", error)
        })

})


app.get( '/random-beer', (req, res, next) =>{
  css=['randomBeer', 'styles']
  punkAPI.getRandom()
      .then( random => { 
        res.render('randomBeer', random[0])
        console.log("random beer object", random);
        console.log('random beer name', random[0].name)
      })
      .catch( err => {console.log( "error while getting a random beer", err)})

})

app.listen(3000);
