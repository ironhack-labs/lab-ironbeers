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

app.get('/Beers',(req, res)=> {

  punkAPI.getBeers().then(beersFromApi => {
    res.render('Beers',{Beers:beersFromApi,Doctitle:'Beers'});
  })
  .catch(error => console.log(error));
});


app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(randomBeer => {
    res.render('random-beer', {beer:randomBeer[0]})
  }) 

  .catch(error => console.log(error))
});


app.get('/about', function (req, res) {
	// layout: false disables the layout for this route
	res.render('about', { title: 'About', layout: false})
})

// app.get('/Beers/:id', (req, res) => {
//   punkAPI
//   .getBeer()
//   .then(beerid => {
//     res.render('Beers', {beer:beerid(1),Doctitle:'Detail Page'})
//   }) 

//   .catch(error => console.log(error))
// });






app.listen(4000, () => console.log('🏃‍ on port 4000'));
