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

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(beerArray => {
      const data = {
        beers: beerArray
      };
      response.render('beers', data);
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (request, response) => {
  punkAPI
    .getRandom()
    .then(responseFromApi => {
      const data = {
        randomBeer: responseFromApi
      }
      response.render('random-beer', data);
    })
    .catch(error => console.log(error));
});

app.get("/beer/:id",(request,response)=>{
  punkAPI
  .getBeer(request.params.id)
  .then((responseFromApi)=>{
    const data = {
      beer: responseFromApi
    }
    console.log(responseFromApi)
    response.render("beer",data)
  })
  .catch(err=>console.log(err))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
