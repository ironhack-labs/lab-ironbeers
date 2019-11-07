const express = require('express');
const hbs = require('hbs');
const app = express(); // app wird als server gesetzt
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper'); // hier wird API importiert
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials'); // hier wird gesetzt, wo die partials zu finden sind

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


// hier legen wir routes fest
app.get('/', (req, res) => {
  res.render('index.hbs');
});

// app.get('/beers', (req, res) => {
//   /* z.B. button fragt nach url /beers in index.hbs -> app.js ruft "get" auf
//      und führt die render-function aus -> beers.hbs wird angezeigt
//   */
//   res.render('beers.hbs');
// });

// app.get('/random-beers', (req, res) => {
//   res.render('random-beers.hbs');
// });

app.get("/beers", (req, res) => {
  punkAPI
    .getBeers() // getBeers() liefert Array der in then übergeben wird
    .then(beers => { // Waiting a response. beers is the response from the API
      const options = { // in options wird ganzes Objekt abgespeichtert mit key beersList und beers ist unser Array
        beersList: beers, // options macht eigentlich nur dann Sinn wenn man mehrere Sachen übergibt, ansonsten reicht es s.u. in der random Beer function

      };
      console.log(beers);
      res.render("beers.hbs", options);
    })
    .catch(error => {
      console.log(error);
    });
});

// app.get("/random-beers", (req, res) => {
//   punkAPI
//     .getBeers()
//     .then(beers => {
//       console.log(beers);
//       res.render("random-beers.hbs");
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

app.get("/random-beers", (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log(randomBeer);

      res.render("random-beers.hbs", {
        randomBeer: randomBeer[0] // 1 random Object liegt in einem Array, müssen das Object ansteuern. Geht hier via Index oder im random-beers.hbs via each loop
      });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);