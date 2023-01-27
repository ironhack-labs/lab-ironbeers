const express = require('express');

const hbs = require('hbs');
const path = require('path');
const { getEnabledCategories } = require('trace_events');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

const router = require('./config/routes.config');
app.use(router);

// app.get('/', (req, res) => {
//   res.render('index');
// });

// app.get('/beers', (req, res) => {
//   punkAPI
//   .getBeers()
//   .then(beersFromApi => {
//     console.log('Beers from the database: ', beersFromApi)
//     res.render('beers', {beersFromApi})
//   }) 
//   .catch(error => console.log(error))
// });

// app.get('/random-beer', (req, res) => {
//   punkAPI
//   .getRandom()
//   .then(randomBeersFromApi => {
//       console.log('Beers from the database: ', randomBeersFromApi)
//       res.render('random-beer', {
//         beer: randomBeersFromApi[0]
//       })
//   }) 
//   .catch(error => console.log(error))
// });


app.listen(3000, () => console.log('🏃‍ on port 3000'));
