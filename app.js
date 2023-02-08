const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));



// Register the location for handlebars partials here:

// ...

// Add the route handlers here:



app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beer', (req, res) => {

 /*  async function grabBeers() {

    try {
      let newBeer = await punkAPI.getBeers();
      
      res.render('beer', newBeer)
      console.log(newBeer)
      
    } catch (error) {
      console.log(error)
      
    }
  }  
  grabBeers(); */

  punkAPI.getBeers()
  .then(beers => {
    res.render('beer', {beers})
    
    
  })
  .catch(err => console.log(err))
  
  
});


app.get('/randomBeer', (req,res) =>{

  punkAPI.getRandom()
  .then(randBeer => {
    res.render('randomBeer', {randBeer})
    console.log(randBeer)
    
    
  })
  .catch(err => console.log(err))
})

app.get('/beers/beer-:id', (req, res) =>{

  const id = req.params.id;
  punkAPI.getBeer(id)
  .then(randBeer => {
    res.render('randomBeer', {randBeer})
  })
  .catch((err) => console.log(err))
}
)

app.listen(3000, () => console.log('🏃‍ on port 3000'));
