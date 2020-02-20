const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
    punkAPI
      .getBeers()
      .then(beersFromApi => {
        console.log(beersFromApi)
        res.render('beers', { beersFromApi })
      })
      .catch(error => console.log(error));
})
app.get('/beers:id', (req, res) => {
    const id = req.params.id
     punkAPI
        .getBeer(id)
        .then((singleBeer) => {
            console.log(singleBeer)
            res.render("beer", { singleBeer } )
        })
        .catch(error => console.log(error))

})
app.get('/random-beers', (req, res) => {
  
  punkAPI
    .getRandom()
    .then(randomBeer => {
        res.render('random-beers', { randomBeer })
    })
    .catch(error => console.log(error));
    })
    

app.listen(3000, () => console.log('🏃‍ on port 3000'));


// app.get('/random-beer', (req, res) =>
//   punkAPI
//     .getRandom()
//     .then(randomBeer => {
//       console.log(randomBeer);
//       res.render('random-beer', { randomBeer });
//     })

// app.get('/allbeers', (req, res) => {
//     punkAPI
//         .getBeers()
//         // todo ok, para el then
//         .then(beersFromApi => res.render('vista', { beersFromApi }))
//         // algo va mal, para el catch
//         .catch(error => console.log(error));
// })