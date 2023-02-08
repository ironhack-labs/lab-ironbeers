const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(`${__dirname}/public`))
// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {
    navbar:true,
    title: 'Main page',
    css:'styles.css'
  });
});

// punkAPI
//   .getBeers()
//   .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
//   .catch(error => console.log(error));

app.get('/beers', async (req, res, next) => {
  try {
    //console.log(punkAPI)
    const beerList = await punkAPI.getBeers()
    res.render('beers', {
      navbar:true,
      title: 'Beers',
      beers: beerList,
      css: 'styles.css'
    })
  } catch (error) {
      next(error)
  }
})

// punkAPI
//   .getRandom()
//   .then(responseFromAPI => {
//     // your magic happens here
//   })
//   .catch(error => console.log(error));

app.get('/random-beer', async (req, res, next) => {
  try {
    const beerRandomList = await punkAPI.getRandom()
    console.log(beerRandomList)
    res.render('random-beer', {
      navbar:true,
      title: 'Random Beer',
      beers: beerRandomList,
      css: 'styles.css'
    })
  } catch (error) {
      next(error)
  }
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
