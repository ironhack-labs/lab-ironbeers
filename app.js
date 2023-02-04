const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, "./", "/views/partials"));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {res.render('beers', { beersFromApi});
  console.log(beersFromApi[0])
}) 
  //console.log('Beers from the database: ',)
  .catch(error => console.log(error));
  //res.render('beers');
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(randomFromApi => {res.render('random-beer', { randomFromApi});
  console.log(randomFromApi[0])
}) 
 .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));


/*{
  id: 1,
  name: 'Buzz',
  tagline: 'A Real Bitter Experience.',
  first_brewed: '09/2007',
  description: 'A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.',
  image_url: 'https://images.punkapi.com/v2/keg.png',
  abv: 4.5,
  ibu: 60,
  target_fg: 1010,
  target_og: 1044,
  ebc: 20,
  srm: 10,
  ph: 4.4,
  attenuation_level: 75,
  volume: { value: 20, unit: 'litres' },
  boil_volume: { value: 25, unit: 'litres' },
  method: {
    mash_temp: [ [Object] ],
    fermentation: { temp: [Object] },
    twist: null
  },
  ingredients: {
    malt: [ [Object], [Object], [Object] ],
    hops: [ [Object], [Object], [Object], [Object], [Object] ],
    yeast: 'Wyeast 1056 - American Ale™'
  },
  food_pairing: [
    'Spicy chicken tikka masala',
    'Grilled chicken quesadilla',
    'Caramel toffee cake'
  ],
  brewers_tips: 'The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.',
  contributed_by: 'Sam Mason <samjbmason>'
}*/
