const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then((beersFromApi) => {
    console.log('Beers from the database: ', beersFromApi)

    const data = {
      listOfBeers: beersFromApi,
    }

    res.render('beers', data)
  })

  .catch((error) => {
    console.log(error)
  })

})

app.get('/random-beer', (req, res) => {

  punkAPI.getRandom()
  .then((responseFromAPI) => {
    const randomBeer = responseFromAPI[0]


    res.render('random-beer', randomBeer)
  })
  .catch((error) => {
    console.log(error)
  })
})


app.get('/beers/:id', (req, res) => {
  const id = req.params.id;
  
  punkAPI.getBeer(id)
  .then((beerDetails) => {

    const data = {
      ...beerDetails[0],
    }

    res.render('beer-details', data)
  })
  .catch((error) => {
    console.log(error)
  })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));



// [
// {
//   name: name,
//   image_url: image_url,
//   description: description,
//   tagline: tagline,
// }
// ]