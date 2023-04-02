const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');


const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


//// Creacion de rutas
app.get("/",(req,res)=>{
 res.render('index');
});

app.get("/beers",(req,res)=>{
  punkAPI.getBeers()
  .then((beersFromApi) => {
    console.log(beersFromApi)
    res.render('beers', { beersFromApi });
  })
  .catch(error => console.log(error));
})

app.get('/random-beer', (req, res) => {

  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    // your magic happens here
    res.render('random-beer', {responseFromAPI});
  })
  .catch(error => console.log(error));

});

app.get('/beers/beer-:id', (req,res) => {

  const id = req.params.id
  punkAPI
  .getBeer(id)
  .then(each => {
    res.render('random-beer', {each});
  })
  .catch((err) => console.log(err))

})


hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
