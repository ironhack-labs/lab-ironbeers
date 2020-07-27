const express = require('express');

const hbs = require('hbs');
const path = require('path');
const crypto = require('crypto');
// const kruptein = require('kruptein')(opts);
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
// ...
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:
// home page route
app.get('/', (req, res) => {
  res.render('hbs-files/index');
});

// beers page route
app.get('/beers', (req, res) => {
  // image, name, description and tagline.
  let beersList = [];
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      for ({ id, name, tagline, description, image_url } of beersFromApi) {
        let randStr = Math.random().toString(36).slice(2);

        beersList.push({ randStr, id, name, tagline, description, image_url });
      }
      // console.log(beersList.length);
      res.render('hbs-files/beers.hbs', beersList);
    })
    .catch(error => console.log(error));
});

// beers page route
app.get('/random-beers', (req, res) => {
  let randomBeerInfo = [];
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      // console.log(responseFromAPI);
      res.render('hbs-files/random-beers.hbs', responseFromAPI[0]);
    })
    .catch(error => console.log(error));
});

// uid
app.get('/beers/:randStr', function (req, res, next) {
  console.log(' beer clicked ');
  //  console.log(req.params.randStr.split('-')[1]);
  let id = req.params.randStr.split('-')[1];
  punkAPI
    .getBeer(id)
    .then(responseFromAPI => {
      console.log(responseFromAPI);
      res.render('hbs-files/random-beers.hbs', responseFromAPI[0]);
    })
    .catch(error => console.log(error));
});

// /** generate a key for the input string */
// function myEncrypt(num) {
//   let str = `${num}`;
//   let mykey = crypto.createCipheriv('aes-128-cbc', 'mypassword');
//   let mystr = mykey.update(str, 'utf8', 'hex');
//   mystr += mykey.final('hex');
//   return mystr;
// }

// /** generate a string  from the key */
// function myDecrypt(str) {
//   let mykey = crypto.createDecipheriv('aes-128-cbc', 'mypassword');
//   let mystr = mykey.update(str, 'hex', 'utf8');
//   mystr += mykey.final('utf8');
//   return mystr;
// }

app.listen(3000, () => console.log('🏃‍ on port 3000'));
