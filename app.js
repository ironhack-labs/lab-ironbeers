const express = require('express');

const hbs = require('hbs');
const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const routes = require('./config/routes.config')
//const { beers, beerId, randomBeer, index } = require('./controllers')


const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.use('/', routes);

//app.get("/", index.index);

// app.get('/', (req, res) => {
//   res.render('index');
// });

//app.get("/beers", beers.beer);

//app.get("/beers/:beerId", beerId.beerId);

// app.get("/beers/:beerId", (req, res) => {
//   const beerId = req.params.beerId;

//   punkAPI.getBeer(beerId)
//     .then((beer) => {
//       res.render("random-beer", {beer: beer[0]});
//     })
//     .catch(error => console.log(error));
// });

//app.get("/random-beer", randomBeer.randomBeer);

// app.get("/random-beer", (req, res) => {
//   punkAPI.getRandom().then((responseFromAPI) => {
//     const randomBeer = responseFromAPI;
//     res.render("random-beer", {beer: randomBeer[0]});
    
//   })
//   .catch(error => console.log(error));
// });

app.listen(3000, () => console.log('🏃‍ on port 3000'));
